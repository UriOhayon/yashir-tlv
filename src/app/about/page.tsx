import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { BASE_URL } from "@/lib/seo";

const title = "הסיפור שמאחורי ישיר | משלוח ישיר ממסעדות תל אביב";
const description =
  "למה בניתי את ישיר - אינדקס חינמי של מסעדות בתל אביב שמשלחות בעצמן, בלי מתווכים ובלי עמלות. הסיפור, והדרך ליצור איתי קשר.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: { title, description, url: `${BASE_URL}/about`, type: "article", locale: "he_IL" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }} dir="rtl">
      <header
        className="sticky top-0 z-10 backdrop-blur-sm"
        style={{ borderBottom: "1px solid var(--border)", backgroundColor: "rgba(255, 255, 255, 0.85)" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <Link href="/" className="text-base font-bold" style={{ color: "var(--ink)" }}>
            ישיר · Yashir
          </Link>
          <Link href="/" className="text-xs font-normal hover:underline" style={{ color: "var(--brand)" }}>
            כל המסעדות ←
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "var(--ink)" }}>
          הסיפור שמאחורי ישיר
        </h1>

        <div className="mt-6 space-y-5 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          <p>
            רובנו התרגלנו להזמין אוכל דרך האפליקציות, ושכחנו שיש דרך אחרת. אבל מאחורי כל הזמנה כזו
            מסתתרת בעיה: על כל מנה, המסעדה מפרישה לפלטפורמה נתח גדול - עמלות שמגיעות לא פעם לעשרות
            אחוזים. בסוף, גם אנחנו משלמים יותר, וגם המסעדות הקטנות נחנקות.
          </p>
          <p>
            בניתי את ישיר לבד, בזמני הפנוי, מתוך אמונה פשוטה שאפשר אחרת. ישיר
            הוא אינדקס חינמי של מסעדות בתל אביב שמשלחות בעצמן - הוא פשוט מפנה אתכם להזמין ישירות מהאתר
            של המסעדה. בלי מתווך, בלי עמלות שמנפחות את המחיר, ורוב הכסף נשאר במקום שאליו הוא צריך
            להגיע: אצל המסעדה.
          </p>
          <p>
            על הדרך גם גיליתי שזה פשוט עדיף - נוח יותר, משתלם יותר, וגם ערכי יותר. בין היתר:
          </p>
          <ul className="list-disc space-y-2 pr-5">
            <li>הכסף הולך למסעדה, לא לאפליקציה</li>
            <li>בעיה בהזמנה? מדברים עם בן אדם במסעדה, לא עם בוט</li>
            <li>מהיר, בלי לבהות במפה ולעקוב אחרי השליח</li>
          </ul>
          <p>
            אני לא גובה שקל מאף אחד, וזו לא עוד פלטפורמת משלוחים. זה פרויקט אישי, מתוך רצון להחזיר
            קצת הוגנות לדרך שבה אנחנו מזמינים אוכל - גם בשביל המסעדות, וגם בשבילנו.
          </p>
          <p>
            אם יש מסעדה ששווה להוסיף, אם משהו לא עובד, או סתם בא לכם להגיד שלום - אשמח לשמוע. ואם בא
            לכם לעזור לקדם את הפרויקט, אתם מוזמנים לפנות אליי.
          </p>
          <a
            href="https://x.com/OhayonUri/status/2069847066633818318"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border p-5 transition hover:opacity-90"
            style={{ borderColor: "var(--border)", backgroundColor: "#ffffff" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  UO
                </span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                    אורי אוחיון
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    @OhayonUri
                  </div>
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
                style={{ color: "var(--ink)" }}
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
              לפני כמה שבועות השקתי כאן את ישיר. היום, בפעם הראשונה, חוויתי את המערכת כלקוח קצה - ולא
              כמייסד. רוב התל-אביבים כבר זנחו לגמרי את האופציה להזמין ישירות ממסעדה. אז הנה תובנה
              מהשטח. 🧵
            </p>
            <div className="mt-3 text-xs font-medium" style={{ color: "var(--brand)" }}>
              צפו בשרשור המלא ב-X ←
            </div>
          </a>
        </div>

        <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "#ffffff" }}>
          <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>יצירת קשר</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href="mailto:urioha@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:opacity-80"
              style={{ borderColor: "#cbcbc8", color: "var(--ink)" }}
            >
              <Mail size={15} style={{ color: "var(--brand)" }} />
              urioha@gmail.com
            </a>
            <a
              href="https://x.com/OhayonUri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:opacity-80"
              style={{ borderColor: "#cbcbc8", color: "var(--ink)" }}
            >
              X · @OhayonUri
            </a>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm font-normal hover:underline" style={{ color: "var(--brand)" }}>
            ← חזרה לכל המסעדות
          </Link>
        </div>
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "#9ca3af" }}>
        <span>ישיר · Yashir - משלוח ישיר ממסעדות תל אביב</span>
      </footer>
    </div>
  );
}
