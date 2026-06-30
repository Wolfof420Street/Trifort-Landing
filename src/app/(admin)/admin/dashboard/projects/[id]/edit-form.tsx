'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject, deleteProjectImage, deleteProject } from '@/lib/actions/admin';
import Image from 'next/image';

type Project = any; // We'll pass the fetched project
type ProjectImage = any;

export default function EditProjectForm({ project, initialImages }: { project: Project, initialImages: ProjectImage[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [altTexts, setAltTexts] = useState<Record<number, string>>({});
  
  // Existing images state to handle UI deletion without immediate reload
  const [images, setImages] = useState(initialImages);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles(selected);
      const initialAlts: Record<number, string> = {};
      selected.forEach((_, i) => initialAlts[i] = '');
      setAltTexts(initialAlts);
    }
  };

  const handleAltChange = (index: number, val: string) => {
    setAltTexts(prev => ({ ...prev, [index]: val }));
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await deleteProjectImage(imageId);
      setImages(images.filter((img: any) => img.id !== imageId));
    } catch (err: any) {
      alert('Failed to delete image: ' + err.message);
    }
  };

  const handleDeleteProject = async () => {
    if (!confirm('Are you absolutely sure you want to delete this ENTIRE project?')) return;
    try {
      await deleteProject(project.id);
      router.push('/admin/dashboard/projects');
    } catch (err: any) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. Update project details
      await updateProject(project.id, formData);

      // 2. Upload new images if any
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const altText = altTexts[i] || formData.get('title');

        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('projectId', project.id);
        uploadData.append('altText', altText as string);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(`Upload failed for ${file.name}: ${data.error}`);
        }
      }

      router.push('/admin/dashboard/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: 'var(--charcoal)', margin: 0 }}>Edit Project</h1>
        <button 
          onClick={handleDeleteProject}
          style={{ background: 'red', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete Project
        </button>
      </div>
      
      {error && <div style={{ padding: '10px', background: '#fee', color: 'red', marginBottom: '20px', borderRadius: '4px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input required name="title" defaultValue={project.title} type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Slug (URL friendly)</label>
          <input required name="slug" defaultValue={project.slug} type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
          <select required name="category" defaultValue={project.category} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Renovation">Renovation</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Location</label>
          <input required name="location" defaultValue={project.location || ''} type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Status</label>
          <select required name="status" defaultValue={project.status} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea required name="description" defaultValue={project.description} rows={5} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
        </div>

        {/* Existing Images */}
        <div style={{ padding: '20px', background: '#f9f9f9', border: '1px solid #eee', borderRadius: '4px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Existing Images</label>
          {images.length === 0 ? (
            <p style={{ color: '#666' }}>No images uploaded yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
              {images.map((img: any) => (
                <div key={img.id} style={{ position: 'relative', border: '1px solid #ddd', padding: '5px', borderRadius: '4px', background: 'white' }}>
                  <div style={{ position: 'relative', width: '100%', height: '100px', marginBottom: '5px' }}>
                    <Image src={img.thumbnailUrl || img.webpUrl} alt={img.altText || 'Project Image'} fill style={{ objectFit: 'cover', borderRadius: '2px' }} />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleDeleteImage(img.id)}
                    style={{ width: '100%', padding: '5px', background: '#fee', color: 'red', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add New Images */}
        <div style={{ padding: '20px', background: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '4px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Add New Images</label>
          <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic,image/avif" onChange={handleFileChange} />
          
          {files.length > 0 && (
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {files.map((file, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', flex: 1 }}>{file.name}</span>
                  <input 
                    type="text" 
                    required 
                    placeholder="Alt Text (Required)" 
                    value={altTexts[i]} 
                    onChange={e => handleAltChange(i, e.target.value)} 
                    style={{ flex: 2, padding: '5px', border: '1px solid #ccc' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          disabled={isSubmitting} 
          style={{ 
            padding: '15px', 
            background: 'var(--gold)', 
            color: 'var(--charcoal)', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '1.1rem'
          }}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
