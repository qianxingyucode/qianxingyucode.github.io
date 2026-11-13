export default function LinkedSegments({ segments }) {
  return segments.map((segment, index) => segment.href
    ? <a className="mentor-link" key={index} href={segment.href} target="_blank" rel="noreferrer" title={`${segment.text} · Google Scholar`}>{segment.strong ? <strong>{segment.text}</strong> : segment.text}</a>
    : <span key={index}>{segment.strong ? <strong>{segment.text}</strong> : segment.text}</span>);
}
