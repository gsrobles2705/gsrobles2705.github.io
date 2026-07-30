
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';

interface CodeBlockProps {
  lines: string[];
  filename?: string;
  className?: string;
  delay?: number;
  compact?: boolean;
}

const tokenize = (line: string) => {
  const tokens: { type: string; text: string }[] = [];
  const regex =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\b(?:const|let|var|function|return|import|from|export|default|if|else|for|while|class|interface|type|extends|new|this|true|false|null|undefined|async|await)\b)|(\b(?:console|log|warn|error|JSON|String|Number|Array|Object|Promise|Map|Set|Date|Math)\b\??)|([{}[\]();,:.=>]|===|!==|==|!=|&&|\|\||\+\+|--|\+|-|\*|\/|%|=>|=)|(\b\d+\.?\d*\b)|(<\/?[\w-]+)|(\b\w+\b)|(\s+)/g;

  let match;
  let lastIndex = 0;
  const text = line;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }

    const [
      , comment, str1, str2, str3, keyword, builtin, operator, number, tag, word, space,
    ] = match;

    if (comment) tokens.push({ type: 'comment', text: comment });
    else if (str1 || str2 || str3) tokens.push({ type: 'string', text: match[0] });
    else if (keyword) tokens.push({ type: 'keyword', text: keyword });
    else if (builtin) tokens.push({ type: 'function', text: builtin });
    else if (operator) tokens.push({ type: 'operator', text: operator });
    else if (number) tokens.push({ type: 'number', text: number });
    else if (tag) tokens.push({ type: 'tag', text: tag });
    else if (word) tokens.push({ type: 'property', text: word });
    else if (space) tokens.push({ type: 'text', text: space });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return tokens;
};

const typeClass: Record<string, string> = {
  keyword: 'syntax-keyword',
  string: 'syntax-string',
  function: 'syntax-function',
  comment: 'syntax-comment',
  number: 'syntax-number',
  operator: 'syntax-operator',
  property: 'syntax-property',
  tag: 'syntax-tag',
  text: '',
};

export default function CodeBlock({ lines, filename, className = '', delay = 0, compact = false }: CodeBlockProps) {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-2xl border border-white/[0.06] bg-[#0d0d12] overflow-hidden shadow-2xl ${className}`}
    >
      {/* VSCode-style header */}
      <div className={`flex items-center gap-2 px-4 ${compact ? 'py-2.5' : 'py-3'} bg-[#111118] border-b border-white/[0.05]`}>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        {filename && (
          <span className="ml-3 text-[11px] text-white/30 font-mono truncate">{filename}</span>
        )}
        <span className="ml-auto text-[10px] text-white/20 font-mono uppercase tracking-wider">
          {lang === 'es' ? 'Solo lectura' : 'Read-only'}
        </span>
      </div>

      {/* Code area */}
      <div className={`${compact ? 'p-3' : 'p-4'} overflow-x-auto`}>
        <pre className={`font-mono ${compact ? 'text-[11px]' : 'text-[13px]'} leading-[1.8]`}>
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className={`select-none text-white/10 text-right tabular-nums ${compact ? 'w-5 mr-3 text-[10px]' : 'w-8 mr-4 text-[11px]'} leading-[1.8]`}>
                  {i + 1}
                </span>
                <span className="flex-1 whitespace-pre">
                  {tokenize(line).map((token, j) => (
                    <span key={j} className={typeClass[token.type] || ''}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
