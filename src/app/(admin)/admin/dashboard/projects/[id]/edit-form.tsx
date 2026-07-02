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

  // --- Shared Styles ---
  const labelStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.55)', fontWeight: 600, marginBottom: '6px', display: 'block'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', height: '44px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '6px', padding: '0 14px', fontFamily: "'Montserrat', sans-serif", fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'transparent'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle, height: 'auto', minHeight: '120px', padding: '12px 14px', resize: 'vertical'
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231e3d2b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px top 50%', backgroundSize: '0.65rem auto'
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, color: 'rgba(0,0,0,0.55)', marginBottom: '16px'
  };

  const dividerStyle: React.CSSProperties = {
    borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '24px', marginTop: '8px'
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#1e3d2b';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,43,0.08)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold, #c8701a)', fontWeight: 600, marginBottom: '8px' }}>
            Edit Portfolio
          </div>
          <h1 style={{ margin: 0, color: 'var(--charcoal, #2a3a30)', fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
            Edit Project
          </h1>
        </div>
        <button 
          type="button"
          onClick={handleDeleteProject}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          style={{ background: 'transparent', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '6px', padding: '8px 16px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s' }}
        >
          Delete Project
        </button>
      </div>
      
      {error && (
        <div style={{ padding: '12px 16px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '6px', color: '#dc2626', fontSize: '0.875rem', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* Form Container Card */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '40px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Group 1: Project Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={sectionLabelStyle}>Project Details</div>
            
            <div>
              <label style={labelStyle}>Title</label>
              <input required name="title" defaultValue={project.title} type="text" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={labelStyle}>Slug (URL friendly)</label>
              <input required name="slug" defaultValue={project.slug} type="text" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={labelStyle}>Category</label>
                <select required name="category" defaultValue={project.category} style={selectStyle} onFocus={handleFocus} onBlur={handleBlur}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Renovation">Renovation</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Status</label>
                <select required name="status" defaultValue={project.status} style={selectStyle} onFocus={handleFocus} onBlur={handleBlur}>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Location</label>
              <input required name="location" defaultValue={project.location || ''} type="text" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          {/* Group 2: Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', ...dividerStyle }}>
            <div style={{ ...sectionLabelStyle, marginBottom: 0 }}>Description</div>
            <div>
              <label style={labelStyle}>Project Description</label>
              <textarea required name="description" defaultValue={project.description} style={textareaStyle} onFocus={handleFocus} onBlur={handleBlur}></textarea>
            </div>
          </div>

          {/* Group 3: Media */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', ...dividerStyle }}>
            <div style={{ ...sectionLabelStyle, marginBottom: 0 }}>Media</div>
            
            {/* Existing Images */}
            <div>
              <label style={{...sectionLabelStyle, fontSize: '0.65rem'}}>Existing Images</label>
              {images.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>No images uploaded yet.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
                  {images.map((img: any) => (
                    <div key={img.id} style={{ borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', background: 'white', padding: '8px' }}>
                      <div style={{ position: 'relative', width: '100%', height: '100px', marginBottom: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <Image src={img.thumbnailUrl || img.webpUrl} alt={img.altText || 'Project Image'} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteImage(img.id)}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        style={{ width: '100%', padding: '6px', background: 'transparent', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', marginTop: '6px', transition: 'background 0.2s' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Images */}
            <div 
              style={{ border: '2px dashed rgba(0,0,0,0.12)', borderRadius: '8px', padding: '24px', background: 'rgba(0,0,0,0.01)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#1e3d2b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'}
            >
              <label style={{...sectionLabelStyle, fontSize: '0.65rem', display: 'block'}}>Add New Images</label>
              <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic,image/avif" onChange={handleFileChange} style={{ fontSize: '0.875rem', fontFamily: "'Montserrat', sans-serif", color: 'var(--charcoal)' }} />
              
              {files.length > 0 && (
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {files.map((file, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', flex: 1, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                      <input 
                        type="text" 
                        required 
                        placeholder="Alt Text (Required)" 
                        value={altTexts[i]} 
                        onChange={e => handleAltChange(i, e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={{ ...inputStyle, flex: 2 }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Group 4: Video */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', ...dividerStyle }}>
            <div style={{ ...sectionLabelStyle, marginBottom: 0 }}>Video</div>
            <div>
              <label style={labelStyle}>YouTube Video URL (optional)</label>
              <input name="videoUrl" defaultValue={project.videoUrl || ''} type="text" placeholder="https://www.youtube.com/watch?v=..." style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          <button 
            disabled={isSubmitting} 
            onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = '#c8701a' }}
            onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = '#1e3d2b' }}
            style={{ 
              width: '100%', height: '48px', background: '#1e3d2b', color: 'white', border: 'none', borderRadius: '6px', fontFamily: "'Montserrat', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.6 : 1, transition: 'background 0.2s', marginTop: '16px'
            }}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
