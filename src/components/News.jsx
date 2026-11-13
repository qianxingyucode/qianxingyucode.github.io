import { t, newsItems } from "../siteConfig";
import { Trophy, Mic2 } from "lucide-react";
import "../css/News.css";

function NewsSegment({ segment }) {
  if (segment.kind === "award" || segment.kind === "oral") {
    const Icon = segment.kind === "award" ? Trophy : Mic2;
    return <strong className={`news-honor news-honor-${segment.kind}`}><Icon aria-hidden="true" />{segment.text}</strong>;
  }
  if (segment.href) return <a className="news-paper" href={segment.href} target="_blank" rel="noreferrer">{segment.text}</a>;
  if (segment.strong) return <strong className="news-emphasis">{segment.text}</strong>;
  return segment.text;
}

export default function News() {
  return <section className="News" id="news" aria-labelledby="news-heading">
    <h2 className="card-title" id="news-heading">{t("News", "最新动态")}</h2>
    <ul className="news-list">{newsItems.map((item, itemIndex) => <li key={`${item.date}-${itemIndex}`}>
      <div className="news-time">{item.date}</div>
      <div className="news-content">{item.segments.map((segment, index) => <NewsSegment segment={segment} key={index} />)}</div>
    </li>)}</ul>
  </section>;
}
