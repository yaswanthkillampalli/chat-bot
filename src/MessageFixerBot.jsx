import React from 'react';

export function formatGeminiResponse(response) {
  const lines = response.split('\n').filter((line) => line.trim());
  const formatted = lines.map((line, index) => {
    const match = line.match(/^\*\*(.+?)\*\*:\s*(.+)$/);
    if (match) {
      const [, heading, content] = match;
      return (
        <div key={index}>
          <h3 className="fw-bold mb-1">{heading}</h3>
          <p className="mb-0">{content}</p>
        </div>
      );
    }
    return <p key={index} className="mb-0">{line}</p>;
  });

  return <div>{formatted}</div>;
}