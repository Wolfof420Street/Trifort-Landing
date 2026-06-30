'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/lib/actions/admin';

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [altTexts, setAltTexts] = useState<Record<number, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles(selected);
      // Init alt texts
      const initialAlts: Record<number, string> = {};
      selected.forEach((_, i) => initialAlts[i] = '');
      setAltTexts(initialAlts);
    }
  };

  const handleAltChange = (index: number, val: string) => {
    setAltTexts(prev => ({ ...prev, [index]: val }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. Create the project via Server Action
      const project = await createProject(formData);

      // 2. Upload images
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
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--charcoal)', marginBottom: '20px' }}>Create New Project</h1>
      
      {error && <div style={{ padding: '10px', background: '#fee', color: 'red', marginBottom: '20px', borderRadius: '4px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input required name="title" type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Slug (URL friendly)</label>
          <input required name="slug" type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
          <select required name="category" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Renovation">Renovation</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Location</label>
          <input required name="location" type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Status</label>
          <select required name="status" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea required name="description" rows={5} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
        </div>

        <div style={{ padding: '20px', background: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '4px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Project Images</label>
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
          {isSubmitting ? 'Saving Project & Uploading...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
