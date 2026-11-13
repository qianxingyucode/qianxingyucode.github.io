import { t } from "../siteConfig";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineCopy, AiOutlineFileText } from "react-icons/ai";
import "../css/Publications.css";
import { publications } from "../siteConfig";
import PublicationPreview from "./PublicationPreview";
import { fetchScholarCitations, resolveCitationCount } from "../utils/scholarCitations";

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
  return Promise.resolve();
}

export default function Publications() {
  const [copiedPaper, setCopiedPaper] = useState("");
  const [bursts, setBursts] = useState([]);
  const [citationMap, setCitationMap] = useState({});
  const [abstractPaper, setAbstractPaper] = useState(null);

  useEffect(() => {
    let active = true;
    fetchScholarCitations().then((citations) => {
      if (active) setCitationMap(citations);
    });
    return () => { active = false; };
  }, []);

  const copyCitation = (paper, event, celebrate = true) => {
    copyText(paper.citation).then(() => {
      const burstId = `${paper.id}-${Date.now()}`;
      setCopiedPaper(paper.id);
      if (celebrate) setBursts((current) => [...current, { id: burstId, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => setCopiedPaper((current) => current === paper.id ? "" : current), 1400);
      window.setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== burstId)), 900);
    }).catch(() => {});
  };

  return (
    <section id="publications">
      <div className="publication-fireworks" aria-hidden="true">
        {bursts.map((burst) => (
          <span className="publication-firework" style={{ left: burst.x, top: burst.y }} key={burst.id}>
            {Array.from({ length: 10 }).map((_, index) => <i style={{ "--particle-angle": `${index * 36}deg` }} key={index} />)}
          </span>
        ))}
      </div>
      <div className="card-title">{t("Publications", "代表性论文")}</div>
      <div className="publications-list">
        {publications.map((paper) => {
          const citationCount = resolveCitationCount(paper.title, citationMap);
          return (
          <article className="publication-card" id={paper.id} key={paper.id}>
            <a className="publication-image-link" href={paper.image} target="_blank" rel="noreferrer" aria-label={`${t("View figure", "查看大图")}: ${paper.title}`} title={t("View full-size figure", "点击查看大图")}><img className="publication-image" src={paper.image} alt={`${paper.title} — ${t("framework overview", "框架概览")}`} loading="lazy" /></a>
            <div className="publication-content">
              <div className="publication-venue">
                <span className={`venue-tag ${paper.venueType}`}>{paper.venue}</span>
                {paper.ccf && <span className="venue-tag ccf">{paper.ccf}</span>}
              </div>
              <h3 className="publication-title">
                {paper.abstract ? (
                  <button className="publication-abstract-trigger" type="button" aria-haspopup="dialog" aria-label={`Preview paper: ${paper.title}`} onClick={() => setAbstractPaper(paper)}>
                    {paper.title}
                  </button>
                ) : paper.title}
              </h3>
              <div className="publication-author-row">
                <div className="publication-authors">{paper.authors.map((author, index) => author.strong ? <strong key={index}>{author.text}</strong> : <React.Fragment key={index}>{author.text}</React.Fragment>)}</div>
                <div className="publication-author-tags">
                  {Number.isFinite(citationCount) && citationCount > 0 && <span className="publication-author-tag is-citation">Cited by {citationCount}</span>}
                  {paper.authorTag && <span className={`publication-author-tag is-${paper.authorTag.type}`}>{paper.authorTag.type === "rank" && <span className="challenge-trophy" aria-hidden="true">🏆</span>}{paper.authorTag.label}</span>}
                </div>
              </div>
              {paper.notes && <ul className="paper-notes">{paper.notes.map(note => <li key={note}>{note}</li>)}</ul>}<div className="publication-tags">{paper.tags.map((tag) => <span className="tag-item-show" key={tag}>{tag}</span>)}</div>
              <div className="publication-links">
                {paper.link && <a href={paper.link} target="_blank" rel="noreferrer"><AiOutlineFileText aria-hidden="true" />{t("Paper", "论文")}</a>}
                {paper.links?.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}
                <button className={`publication-cite${copiedPaper === paper.id ? " is-copied" : ""}`} type="button" onClick={(event) => copyCitation(paper, event)}>
                  {copiedPaper === paper.id ? <AiOutlineCheck aria-hidden="true" /> : <AiOutlineCopy aria-hidden="true" />}
                  {copiedPaper === paper.id ? t("Copied", "已复制") : t("Cite", "引用")}
                </button>
                <span className="publication-citation-preview">{paper.citation}</span>
              </div>
            </div>
          </article>
          );
        })}
      </div>
      {abstractPaper && <PublicationPreview paper={abstractPaper} papers={publications} onChange={setAbstractPaper} onClose={() => setAbstractPaper(null)} onCopy={copyCitation} copied={copiedPaper} />}
    </section>
  );
}
