"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import RichTextEditor from '@/app/components/RichTextEditor';

export default function BlogGenerationUI() {
  const [newBlog, setNewBlog] = useState({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    author: 'Admin Team',
    metaTitle: '',
    metaDescription: '',
    published: true,
    faqs: [],
    reviews: []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setNewBlog(prev => ({ ...prev, image: file.name }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveBlog = async () => {
    if (!newBlog.title || !newBlog.description) {
      alert("Please provide at least a Title and some Blog Content!");
      return;
    }

    try {
      setIsSaving(true);

      let imageUrl = newBlog.image;

      // If we have a file selected, upload it to Firebase Storage first
      if (imageFile) {
        const fileExtension = imageFile.name.split('.').pop();
        const fileName = `blogs/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Auto-generate slug if empty
      let finalSlug = newBlog.slug;
      if (!finalSlug) {
        finalSlug = newBlog.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }

      // Save to Firebase
      await addDoc(collection(db, "blogs"), {
        ...newBlog,
        slug: finalSlug,
        image: imageUrl,
        createdAt: serverTimestamp(),
        // published is now taken from newBlog state
      });

      alert("Blog published successfully!");

      // Reset form
      setNewBlog({
        title: '',
        subtitle: '',
        slug: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        author: 'Admin Team',
        metaTitle: '',
        metaDescription: '',
        published: true,
        faqs: [],
        reviews: []
      });
      setImagePreview(null);
      setImageFile(null);

    } catch (error: any) {
      console.error("Error saving blog:", error);
      alert("Failed to save the blog: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm max-w-5xl mx-auto mt-6"
    >
      <div className="mb-2">
        <Link href="/admin/blogs" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Blogs List
        </Link>
      </div>

      <div className="border-b border-gray-100 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Blog</h1>
        <p className="text-gray-500 text-sm mt-1">Generate or manually create a new blog post for the website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-slate-400">Blog Title</label>
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            className="p-3.5 border border-slate-200 rounded-xl focus:border-blue-500 font-semibold text-slate-900 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-slate-400">URL Slug</label>
          <input
            type="text"
            name="slug"
            value={newBlog.slug}
            onChange={handleInputChange}
            className="p-3.5 border border-slate-200 rounded-xl focus:border-blue-500 font-mono font-semibold text-slate-900 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-400">Subtitle / Excerpt</label>
          <input
            type="text"
            name="subtitle"
            value={newBlog.subtitle}
            onChange={handleInputChange}
            placeholder="A short summary of the blog post..."
            className="p-3.5 border border-slate-200 rounded-xl focus:border-blue-500 font-semibold text-slate-900 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-slate-400">Author</label>
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
            className="p-3.5 border border-slate-200 rounded-xl focus:border-blue-500 font-semibold text-slate-900 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-slate-400">Status</label>
          <select
            name="published"
            value={newBlog.published ? 'true' : 'false'}
            onChange={(e) => setNewBlog(prev => ({ ...prev, published: e.target.value === 'true' }))}
            className="p-3.5 border border-slate-200 rounded-xl focus:border-blue-500 font-semibold text-slate-900 bg-white"
          >
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>

        {/* IMAGE GENERATION/UPLOAD BLOCK */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-400">Cover Image</label>

          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              name="image"
              value={newBlog.image}
              onChange={handleInputChange}
              placeholder="Paste an image URL or upload one"
              className="p-3.5 border border-slate-200 rounded-xl flex-1 bg-white text-slate-900 focus:border-blue-500"
            />

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Cover Image
              </button>
            </div>
          </div>

          {imagePreview && (
            <div className="mt-2 flex items-center gap-3 p-2 bg-slate-50 border border-slate-100 rounded-xl w-max">
              <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg shadow-sm" />
              <div className="text-xs font-semibold text-slate-600 pr-2">Image Selected</div>
            </div>
          )}
        </div>

        {/* BLOG CONTENT BLOCK */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-400">Blog Content (Markdown/HTML)</label>
          <textarea
            name="content"
            rows={12}
            value={newBlog.description}
            onChange={(e) => setNewBlog(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Write your amazing blog post here..."
            className="p-4 border border-slate-200 rounded-xl focus:border-blue-500 font-sans leading-relaxed resize-y text-slate-900 bg-white"
          />
        </div>

        {/* SEO BLOCK */}
        <div className="flex flex-col gap-1.5 md:col-span-2 mt-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-2">SEO Settings</h3>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-400">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={newBlog.metaTitle}
            onChange={handleInputChange}
            placeholder="SEO Title (leave empty to use Blog Title)"
            className="p-3.5 border border-slate-200 rounded-xl focus:border-blue-500 font-semibold text-slate-900 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-400">Meta Description</label>
          <textarea
            name="metaDescription"
            rows={3}
            value={newBlog.metaDescription}
            onChange={handleInputChange}
            placeholder="SEO Description (a short snippet for search engines)"
            className="p-4 border border-slate-200 rounded-xl focus:border-blue-500 font-sans leading-relaxed resize-y text-slate-900 bg-white"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-2 flex justify-end mt-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            disabled={isSaving}
            className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-md shadow-green-600/20 transition-all cursor-pointer disabled:opacity-50"
            onClick={handleSaveBlog}
          >
            {isSaving ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
