import HeroActions from "../molecules/HeroActions";
import HeroArtwork from "../molecules/HeroArtwork";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <i /> OPEN FOR SUPPORT
        </div>
        <h1>
          ทุกการสนับสนุน
          <br />
          ช่วยให้<span>ไอเดีย</span>
          <br />
          เติบโตต่อไป
        </h1>
        <p>
          ขอบคุณที่แวะมา ผลงานและสิ่งที่เรียนรู้ถูกแบ่งปันไว้บน GitHub
          หากคุณชอบสิ่งที่ทำและอยากเป็นส่วนหนึ่งของการเดินทางนี้
          สามารถร่วมสนับสนุนได้ที่นี่
        </p>
        <HeroActions />
      </div>
      <HeroArtwork />
    </section>
  );
}
