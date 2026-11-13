import LinkedSegments from "./LinkedSegments";
import { Network, HeartPulse, Sparkles } from "lucide-react";
import "../css/About.css";
import { about, t } from "../siteConfig";

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="about-heading-row">
        <h2 id="about-heading">{t("About me", "关于我")}</h2>
        <span className="about-heading-line" aria-hidden="true" />
        <Sparkles size={17} aria-hidden="true" />
      </div>
      <div className="intro-text">
        {about.paragraphs.map((paragraph, index) => <p key={index}><LinkedSegments segments={paragraph} /></p>)}
        {about.quote && <blockquote>{about.quote.text}<footer>{about.quote.author}</footer></blockquote>}
      </div>
      {about.researchInterests?.length > 0 && <div className="research-focus" aria-labelledby="research-heading">
        <h3 id="research-heading">{t("Research interests", "研究方向")}</h3>
        <ul className="research-interest-list">
          {about.researchInterests.map((interest, index) => <li key={interest}>
            {index === 0 ? <Network aria-hidden="true" /> : <HeartPulse aria-hidden="true" />}
            <span>{interest}</span>
          </li>)}
        </ul>
      </div>}
    </section>
  );
}
