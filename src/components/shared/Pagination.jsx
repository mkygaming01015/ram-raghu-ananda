import { useState } from 'react';

export default function Pagination({ totalItems, itemsPerPage = 10, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
        Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        <button className="btn btn-ghost btn-sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>← Prev</button>
        {pages.map((p, i) => p === '...' ? (
          <span key={`e${i}`} style={{ padding: '4px 8px', color: 'var(--gray-400)' }}>...</span>
        ) : (
          <button key={p} className={`btn btn-sm ${p === currentPage ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onPageChange(p)}>{p}</button>
        ))}
        <button className="btn btn-ghost btn-sm" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next →</button>
      </div>
    </div>
  );
}
