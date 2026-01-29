'use client';

import { useState, useEffect } from 'react';

interface DomainSuggestion {
  domain: string;
  tld: string;
  registrationUrl: string;
  provider: string;
}

interface DomainSuggestionsProps {
  pattern: string; // The vanity pattern that was found (e.g., "DOGE" from "DOGE...xyz")
}

/**
 * Domain Suggestions component
 * Shows domain name suggestions based on the generated vanity pattern
 * Links directly to registration sites where users can check availability
 */
export function DomainSuggestions({ pattern }: DomainSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<DomainSuggestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Extract a clean name from the pattern
  const cleanName = pattern
    .replace('...', '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 32);

  useEffect(() => {
    if (!cleanName || cleanName.length < 2) {
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/domains?name=${encodeURIComponent(cleanName)}`);
        
        if (!response.ok) {
          throw new Error('Failed to get suggestions');
        }

        const data = await response.json();
        setSuggestions(data.suggestions);
      } catch (err) {
        console.error('Domain suggestion error:', err);
        setError('Could not load domain suggestions');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [cleanName]);

  // Don't show if pattern is too short
  if (!cleanName || cleanName.length < 2) {
    return null;
  }

  return (
    <div className="border border-purple-200 bg-purple-50 rounded p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h3 className="text-caption font-bold text-purple-800 uppercase tracking-wider flex items-center gap-2">
            <span>🌐</span>
            <span>Domain Suggestions</span>
          </h3>
          <p className="text-micro text-purple-600 mt-1">
            {loading ? (
              'Loading...'
            ) : error ? (
              error
            ) : suggestions ? (
              `Get a matching domain for "${cleanName}"`
            ) : (
              'View domain options'
            )}
          </p>
        </div>
        <span className={`text-purple-500 transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="mt-4 space-y-2">
          {loading ? (
            <div className="flex items-center gap-2 text-purple-600">
              <span className="animate-spin">⏳</span>
              <span>Loading suggestions...</span>
            </div>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : suggestions ? (
            <>
              <div className="grid gap-2">
                {suggestions.map((suggestion) => (
                  <a
                    key={suggestion.domain}
                    href={suggestion.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-purple-500">🔗</span>
                      <div>
                        <p className="font-mono font-medium text-ink">
                          {suggestion.domain}
                        </p>
                        <p className="text-micro text-muted">
                          via {suggestion.provider}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-purple-600 hover:text-purple-800">
                      Check & Register →
                    </span>
                  </a>
                ))}
              </div>

              <p className="text-micro text-purple-600 mt-3">
                Click to check availability and register. Domains make your address easy to share!
              </p>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
