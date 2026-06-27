import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/seo";

const title = "הצהרת נגישות | ישיר";
const description =
  "הצהרת הנגישות של אתר ישיר - המאמצים להנגיש את האתר לאנשים עם מוגבלות בהתאם לתקן הישראלי ולתקנות הנגישות.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${BASE_URL}/accessibility` },
};

export default function AccessibilityPage() {
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
          הצהרת נגישות
        </h1>

        <div className="mt-6 space-y-5 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          <p>
            אתר ישיר (yashirdelivery.com) רואה חשיבות רבה במתן שירות שוויוני לכלל המשתמשים, ופועל
            להנגיש את האתר לאנשים עם מוגבלות, מתוך מחויבות לכך שכל אדם יוכל לגלוש בו בעצמאות, בכבוד
            ובנוחות.
          </p>
          <p>
            אנו שואפים לעמוד בהוראות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
            התשע&quot;ג-2013, ובתקן הישראלי ת&quot;י 5568 המבוסס על הנחיות WCAG 2.0 ברמת AA.
          </p>
          <p>
            בין הפעולות שבוצעו להנגשת האתר: מבנה דפים סמנטי וכותרות מסודרות, אפשרות ניווט ותפעול
            באמצעות מקלדת, סימון מצב פוקוס, טקסט חלופי לתמונות, ניגודיות צבעים נאותה, תמיכה בכיווניות
            עברית (RTL) ותיוג רכיבים עבור קוראי מסך.
          </p>
          <p>
            חשוב לנו לציין: ישיר הוא פרויקט עצמאי הנמצא בפיתוח ושיפור מתמשכים. ייתכן שיימצאו באתר רכיבים
            שטרם הונגשו במלואם. אנו ממשיכים לפעול לשיפור הנגישות באופן שוטף.
          </p>
          <p>נתקלתם בקושי נגישות, יש לכם הערה או בקשה? נשמח שתפנו אלינו ונטפל בכך בהקדם:</p>
          <p>
            אורי אוחיון — אחראי נגישות
            <br />
            דוא&quot;ל:{" "}
            <a href="mailto:urioha@gmail.com" className="hover:underline" style={{ color: "var(--brand)" }}>
              urioha@gmail.com
            </a>
          </p>
          <p style={{ fontSize: "0.9em" }}>הצהרה זו עודכנה ביוני 2026.</p>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm font-normal hover:underline" style={{ color: "var(--brand)" }}>
            ← חזרה לכל המסעדות
          </Link>
        </div>
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "#595959" }}>
        <Link href="/about" className="hover:underline" style={{ color: "#595959" }}>
          הסיפור מאחורי הפרויקט
        </Link>
      </footer>
    </div>
  );
}
