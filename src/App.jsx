import { useState } from "react";
import "./index.css";

/* ─── Palette ─── */
const P = {
  friday:    { main: "#1B6B93", grad: "linear-gradient(135deg, #1B4965, #2D7D8A)", bg: "#E8F2F8", light: "#C5DFF0" },
  saturday:  { main: "#B8860B", grad: "linear-gradient(135deg, #B8860B, #D4A017)", bg: "#FDF4E0", light: "#F0DDA0" },
  sunday:    { main: "#4A7C59", grad: "linear-gradient(135deg, #3D6B4A, #5F8A6D)", bg: "#E8F3EB", light: "#C4DCCA" },
  dateNight: { main: "#C1666B", grad: "linear-gradient(135deg, #A0525B, #C1666B)", bg: "#FBE8E9", light: "#F2CED0" },
};

/* ─── Data (unchanged) ─── */
const DAYS = [
  {
    id: "friday", label: "Friday", tagline: "East Beach Morning + Date Night", color: P.friday,
    morning: {
      title: "East Beach Morning", location: "East Beach, Santa Barbara",
      time: "~9:00\u201311:30 AM \u2014 home by noon for Isabelle\u2019s nap",
      details: [
        "Sand play & splash zone for the littles",
        "Running space + wave chasing for the 7-year-old",
        "4 adults = easy zone defense \u2014 rotate coffee runs",
        "Pack: shade tent, towels, sand toys, snacks, waters, sunscreen",
      ],
      backup: "Leadbetter Beach if windy (more sheltered, grassy shade area)",
      tip: "Budget 30 min for the sandy-kid-to-car transition.",
    },
    afternoon: {
      title: "Nap \u2192 Downtown Split",
      items: [
        "Isabelle naps at noon \u2014 everyone recharges",
        "Post-nap: Kim & Blake take 3 kids to Mesa playground (mellow, shaded, contained)",
        "Adrian & Alex walk State Street \u2014 coffee, browse, mini date",
        "Regroup ~4:00 PM at home for handoff before date night",
      ],
      note: "Kim & Blake leave for The Lark at 5 PM \u2014 Adrian & Alex prep fajitas + handle bedtime.",
    },
    evening: {
      title: "Date Night", subtitle: "Kim & Blake", isDateNight: true,
      plan: [
        "Kim & Blake head out at 5:00 PM \u2014 holiday weekend, aim for bar seats early",
        "Walk the Funk Zone before or after dinner",
        "Adrian & Alex handle all 3 kids: fajitas, bath, bedtime",
        "No bedtime handoff needed \u2014 clean departure for Kim & Blake",
      ],
      restaurant: {
        name: "The Lark", topPick: true, address: "131 Anacapa St",
        desc: "New American \u00b7 Family-style \u00b7 Historic Fish Market building",
        price: "$50\u2013100/pp",
        highlights: ["Brown butter cornbread", "Crispy Brussels sprouts", "Handmade pappardelle", "Flat iron steak"],
        reserve: "Aim for bar seats at 5 PM \u2014 holiday weekend, no reservation needed for bar",
        note: "Fire pit patio seating \u00b7 Bar is first-come first-served",
      },
      backupRestaurants: [
        { name: "Loquita", address: "202 State St", desc: "Spanish tapas \u00b7 Wood-fired \u00b7 Great gin & tonics", tip: "2 blocks from The Lark. Bar seats usually available. Patio is gorgeous." },
        { name: "Bibi Ji", address: "628 State St", desc: "Indian street food \u00b7 Michelin Guide \u00b7 Cocktail-forward", tip: "Upstairs on State. Fun, vibrant atmosphere. Shareable plates work great at the bar." },
        { name: "Lucky Penny", address: "127 Anacapa St", desc: "Wood-fired pizza \u00b7 Craft cocktails \u00b7 Funk Zone", tip: "Right next to The Lark. Casual but excellent. Easy walk-in, never a long wait." },
      ],
      whyFriday: "Everyone fresh \u00b7 Sets weekend tone \u00b7 5 PM = best shot at bar seats",
    },
    meals: {
      breakfast: { text: "Yogurt, berries, toast, coffee", tip: "Ready by 8:15 \u2014 beach at 9" },
      lunch: { text: "Build-your-own wraps", detail: "Deli turkey, hummus, cheese, veggies, chips \u2014 kids customize" },
      kidsDinner: { text: "Sheet Pan Chicken Fajitas w/ Creamy Verde Sauce", tip: "Adrian & Alex prep before Kim & Blake leave at 5. Season chicken, chop veggies, sheet-pan-ready. Oven at 5:30.", recipe: true },
      adultDinner: { text: "The Lark bar (Kim & Blake) \u00b7 Adrian & Alex eat with kids or after bedtime" },
    },
  },
  {
    id: "saturday", label: "Saturday", tagline: "Lil\u2019 Toot Boat + Cozy Family Night", color: P.saturday,
    warning: "Highest-risk meltdown day \u2014 keep expectations low. Protect the noon nap.",
    morning: {
      title: "Lil\u2019 Toot Water Taxi Ride", location: "Santa Barbara Harbor",
      time: "10:45 AM departure \u2014 plan to arrive by 10:15",
      details: ["Short harbor boat ride \u2014 big hit for all 3 kids", "Explore the harbor & breakwater before/after", "Watch boats, sea lions, pelicans", "Home by noon for Isabelle\u2019s nap"],
      backup: "If sold out: harbor walk + playground at Chase Palm Park",
      tip: "Buy tickets in advance \u2014 Saturday morning slots sell out.",
    },
    afternoon: {
      title: "Nap + Ice Cream Stroll",
      items: ["Isabelle naps at noon", "Post-nap: ice cream at McConnell\u2019s", "Easy downtown walk \u2014 nothing ambitious"],
      note: "Pick ONE post-nap activity. No stacking.",
    },
    evening: {
      title: "Pizza & Movie Night", subtitle: "All Together",
      plan: ["Store-bought dough (TJ\u2019s / Whole Foods) \u2014 kids top their own pizzas", "Let kids choose the movie = emotional win", "Adult pizza after kids are down: Sweet & Spicy Pepperoni w/ honey drizzle"],
    },
    meals: {
      breakfast: { text: "Pancakes or eggs", tip: "Assign a cook \u2014 start by 8 if leaving at 9:45" },
      lunch: { text: "Easy tacos", tip: "Lay out taco stuff at 11:30 before nap. Adults eat properly after." },
      dinner: { text: "Homemade pizza + salad" },
    },
  },
  {
    id: "sunday", label: "Sunday", tagline: "Butterfly Beach + Tide Pools + Brunch Send-Off", color: P.sunday,
    morning: {
      title: "Butterfly Beach Morning", location: "Butterfly Beach, Montecito",
      time: "~9:00\u201311:15 AM \u2014 home by noon for nap",
      details: [
        "Calmer waves, great for littles \u2014 gorgeous sandy beach",
        "Running and splash zone for the older kids",
        "4 adults = easy rotation for coffee/snack runs",
        "No tide pools this morning \u2014 tide is HIGH at 9 AM (~5 ft)",
      ],
      backup: "SB Zoo morning \u2014 stroller-friendly, shaded, contained",
      tip: "Tide pools move to afternoon \u2014 see below.",
    },
    afternoon: {
      title: "Tide Pools + Brunch Board + Pack Up",
      items: [
        "Isabelle naps at noon \u2014 start packing & load car while she sleeps",
        "~2:30 PM: Tide pool trip to Channel Drive! Low tide hits -0.75 ft at ~3 PM",
        "Split: 2 adults + older kids to pools, 1 adult stays with Isabelle",
        "Sea stars, hermit crabs, anemones \u2014 best tide of the weekend",
        "Home by 3:30 \u2192 Brunch Board spread \u2192 final pack \u2192 goodbye",
      ],
      note: "The negative tide is incredible \u2014 don\u2019t skip this. Quick 45-min trip while it\u2019s super low.",
    },
    evening: null,
    meals: {
      brunch: { text: "Ultimate Spring Brunch Board", detail: "Roasted baby potatoes + crispy bacon on one sheet pan, scrambled eggs, burrata caprese, smoked salmon, bagels, cream cheese, fruit, yogurt, OJ & coffee", tip: "Optional: prep Raspberry Ricotta Croissant French Toast Saturday night as a bonus.", recipe: true },
    },
  },
];

const ACTION_ITEMS = [
  { text: "The Lark bar plan \u2014 Friday 5:00 PM arrival", urgent: true, detail: "Bar is first-come, no reservation. Holiday weekend = go early. 3 backups if packed." },
  { text: "Buy Lil\u2019 Toot tickets \u2014 Saturday 10:45 AM", urgent: true, detail: "Saturday morning sells out" },
  { text: "Sunday tide pools at ~2:30 PM", urgent: false, detail: "Low tide -0.75 ft at ~3 PM. Morning is HIGH tide (5+ ft) \u2014 no pools until afternoon." },
  { text: "Grocery run", urgent: false, detail: "Thursday night or Friday morning?" },
  { text: "Confirm Kim & Alex departure time Sunday", urgent: false, detail: "Affects whether morning beach happens" },
  { text: "Pack beach gear", urgent: false, detail: "Shade tent, towels, sand toys, sunscreen, rash guards, hats" },
];

/* ─── Shared styles ─── */
const s = {
  label: { fontFamily: "'Karla', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#A8A29E" },
  serif: { fontFamily: "'Cormorant Garamond', Georgia, serif" },
};

/* ─── Wave SVG ─── */
function WaveDivider({ fill = "#F5F0E8" }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", marginTop: -1 }}>
      <path d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill={fill} />
    </svg>
  );
}

/* ─── Hero Header ─── */
function Hero({ view, setView }) {
  return (
    <div style={{ animation: "staggerIn 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>
      <div
        style={{
          background: "linear-gradient(165deg, #0D3149 0%, #1B4965 25%, #2D7D8A 50%, #5F8A6D 70%, #D4A017 90%, #E07A5F 100%)",
          borderRadius: "20px 20px 0 0",
          padding: "44px 28px 48px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hero-inner"
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -40, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

        <div style={{ ...s.label, color: "rgba(255,255,255,0.6)", letterSpacing: "3px", marginBottom: 12 }}>
          Family Weekend Plan
        </div>
        <h1 className="hero-title" style={{ ...s.serif, fontSize: 42, fontWeight: 600, color: "#fff", marginBottom: 8, lineHeight: 1.05 }}>
          Santa Barbara<br />Weekend
        </h1>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 24, fontWeight: 300 }}>
          Kim &amp; Alex + Adrian &amp; Blake<br />3 kids &middot; One adventure/day &middot; Date night
        </div>

        {/* View toggle — inside the hero */}
        <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: 3, width: "fit-content", backdropFilter: "blur(8px)" }}>
          {["plan", "summary"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                fontFamily: "'Karla', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background: view === v ? "rgba(255,255,255,0.95)" : "transparent",
                color: view === v ? "#1B4965" : "rgba(255,255,255,0.7)",
                transition: "all 0.25s",
                letterSpacing: "0.3px",
              }}
            >
              {v === "plan" ? "Full Plan" : "Summary"}
            </button>
          ))}
        </div>
      </div>
      <WaveDivider />
    </div>
  );
}

/* ─── Components ─── */
function Badge({ children, color, bg, border }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 12px", borderRadius: 999, fontSize: 9,
      fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
      background: bg, color: color, border: border ? `1px solid ${border}` : "none",
    }}>
      {children}
    </span>
  );
}

function SectionBlock({ label, borderColor, children }) {
  return (
    <div style={{ marginBottom: 20, paddingLeft: 18, borderLeft: `3px solid ${borderColor || "#D6D3D1"}` }}>
      <div style={{ ...s.label, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h4 style={{ ...s.serif, fontSize: 20, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{children}</h4>;
}

function Meta({ icon, children }) {
  return (
    <div style={{ fontSize: 13, color: "#78716C", display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
      <span style={{ fontSize: 14 }}>{icon}</span><span>{children}</span>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 14, color: "#44403C", lineHeight: 1.9 }}>
      {items.map((item, i) => <li key={i} style={{ paddingLeft: 2 }}>{item}</li>)}
    </ul>
  );
}

function Note({ children }) {
  return <div style={{ marginTop: 10, color: "#78716C", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>{children}</div>;
}

function Backup({ children }) {
  return <div style={{ marginTop: 10, fontSize: 13, color: "#A8A29E", fontStyle: "italic" }}>Backup: {children}</div>;
}

function Tip({ children, color }) {
  return (
    <div style={{
      marginTop: 10, fontSize: 12, color: color || "#78716C", fontWeight: 500,
      background: color ? `${color}12` : "#F0EBE3",
      padding: "8px 12px", borderRadius: 8,
      borderLeft: color ? `3px solid ${color}30` : "none",
    }}>
      {children}
    </div>
  );
}

/* ─── Premium Restaurant Card (dark) ─── */
function RestaurantCard({ restaurant }) {
  return (
    <div style={{
      borderRadius: 12, padding: "18px 20px", marginTop: 14,
      background: "linear-gradient(145deg, #0D3149, #1B4965)",
      color: "#fff", position: "relative", overflow: "hidden",
    }}>
      {/* Subtle decorative glow */}
      <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "rgba(212, 160, 23, 0.08)" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ ...s.serif, fontSize: 22, fontWeight: 600 }}>{restaurant.name}</span>
        {restaurant.topPick && <Badge color="#D4A017" bg="rgba(212, 160, 23, 0.15)" border="rgba(212, 160, 23, 0.3)">Top Pick</Badge>}
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
        {restaurant.desc} &middot; {restaurant.price}
        {restaurant.note && <> &middot; {restaurant.note}</>}
      </div>
      {restaurant.highlights && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {restaurant.highlights.map((h, i) => (
            <span key={i} style={{
              fontSize: 11, padding: "4px 12px", borderRadius: 999, fontWeight: 500,
              background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              {h}
            </span>
          ))}
        </div>
      )}
      {restaurant.reserve && (
        <div style={{ marginTop: 12, fontSize: 12, fontWeight: 700, color: "#D4A017", letterSpacing: "0.3px" }}>
          Reserve: {restaurant.reserve}
        </div>
      )}
    </div>
  );
}

function AltRestaurant({ alt }) {
  return (
    <div style={{ marginTop: 10, fontSize: 12, color: "#78716C", padding: "10px 14px", borderRadius: 8, background: "#F0EBE3", border: "1px dashed #D6D3D1" }}>
      <strong style={{ color: "#44403C" }}>Alt: {alt.name}</strong> ({alt.address}) &mdash; {alt.desc}
      {alt.tip && <div style={{ marginTop: 4, fontStyle: "italic", color: "#A8A29E" }}>{alt.tip}</div>}
    </div>
  );
}

function RecipeCard({ title, tip, dayColor }) {
  return (
    <div style={{ borderRadius: 10, padding: "12px 14px", marginTop: 10, background: dayColor.bg, border: `1px solid ${dayColor.light}`, fontSize: 13, lineHeight: 1.6 }}>
      <div style={{ fontWeight: 600, color: "#1C1917", marginBottom: 3 }}>{title}</div>
      {tip && <div style={{ fontSize: 12, fontStyle: "italic", color: "#78716C" }}>{tip}</div>}
    </div>
  );
}

function MealsGrid({ meals, dayColor }) {
  return (
    <div style={{ background: "#F0EBE3", borderRadius: 12, padding: "16px 18px", marginTop: 8 }}>
      <div style={{ ...s.label, marginBottom: 12 }}>Meals</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.entries(meals).map(([key, val]) => (
          <div key={key} style={{ fontSize: 13, color: "#44403C" }}>
            <strong style={{ color: "#78716C", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {key === "kidsDinner" ? "Kids Dinner" : key === "adultDinner" ? "Adult Dinner" : key}:
            </strong>{" "}
            {val.text}
            {val.detail && <div style={{ fontSize: 12, color: "#A8A29E", marginTop: 3 }}>{val.detail}</div>}
            {val.tip && !val.recipe && <Tip color={dayColor.main}>{val.tip}</Tip>}
            {val.recipe && <RecipeCard title={val.text} tip={val.tip} dayColor={dayColor} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Day Card ─── */
function DayCard({ day, isExpanded, onToggle, staggerClass }) {
  return (
    <div
      className={staggerClass}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
        boxShadow: isExpanded
          ? "0 8px 30px rgba(27, 73, 101, 0.1), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 1px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Gradient top accent bar */}
      <div style={{ height: 4, background: day.color.grad }} />

      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
          fontFamily: "'Karla', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, background: day.color.grad,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700,
            flexShrink: 0, boxShadow: `0 2px 8px ${day.color.main}30`,
          }}>
            {day.label[0]}
          </div>
          <div>
            <div style={{ ...s.serif, fontSize: 22, fontWeight: 600, color: "#1C1917" }}>{day.label}</div>
            <div style={{ fontSize: 13, color: "#78716C", marginTop: 1 }}>{day.tagline}</div>
          </div>
        </div>
        <span style={{
          fontSize: 16, color: "#A8A29E",
          transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)", flexShrink: 0,
        }}>
          &#9662;
        </span>
      </button>

      {isExpanded && (
        <div className="day-content-inner" style={{ padding: "0 22px 24px", animation: "fadeSlideIn 0.35s ease-out" }}>
          {day.warning && (
            <div style={{
              background: "linear-gradient(135deg, #FEF7E6, #FDF0D0)", border: "1px solid #F3DFA0",
              borderRadius: 10, padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "#92400E",
              marginBottom: 20, lineHeight: 1.5,
            }}>
              {day.warning}
            </div>
          )}

          <SectionBlock label="Morning — Primary Adventure" borderColor={day.color.main}>
            <SectionTitle>{day.morning.title}</SectionTitle>
            {day.morning.location && <Meta icon="📍">{day.morning.location}</Meta>}
            <Meta icon="⏱">{day.morning.time}</Meta>
            <BulletList items={day.morning.details} />
            {day.morning.backup && <Backup>{day.morning.backup}</Backup>}
            {day.morning.tip && <Tip color={day.color.main}>{day.morning.tip}</Tip>}
          </SectionBlock>

          <SectionBlock label="Afternoon" borderColor="#D6D3D1">
            <SectionTitle>{day.afternoon.title}</SectionTitle>
            <BulletList items={day.afternoon.items} />
            {day.afternoon.note && <Note>{day.afternoon.note}</Note>}
          </SectionBlock>

          {day.evening && (
            <SectionBlock label="Evening" borderColor={day.evening.isDateNight ? P.dateNight.main : "#D6D3D1"}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <SectionTitle>{day.evening.title}</SectionTitle>
                {day.evening.isDateNight && <Badge color="#C1666B" bg="#FBE8E9" border="#F2CED0">Date Night</Badge>}
              </div>
              {day.evening.subtitle && <div style={{ fontSize: 13, color: "#78716C", marginBottom: 6 }}>{day.evening.subtitle}</div>}
              <BulletList items={day.evening.plan} />
              {day.evening.restaurant && <RestaurantCard restaurant={day.evening.restaurant} />}
              {day.evening.backupRestaurants && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ ...s.label, fontSize: 9, marginBottom: 8, color: "#A8A29E" }}>If The Lark bar is packed</div>
                  {day.evening.backupRestaurants.map((alt, i) => (
                    <AltRestaurant key={i} alt={alt} />
                  ))}
                </div>
              )}
              {day.evening.altRestaurant && <AltRestaurant alt={day.evening.altRestaurant} />}
              {day.evening.whyFriday && <div style={{ marginTop: 10, fontSize: 12, color: "#A8A29E", fontStyle: "italic" }}>{day.evening.whyFriday}</div>}
            </SectionBlock>
          )}

          <MealsGrid meals={day.meals} dayColor={day.color} />
        </div>
      )}
    </div>
  );
}

/* ─── Action Items ─── */
function ActionItems() {
  return (
    <div className="stagger-7" style={{
      background: "#fff", borderRadius: 16, overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginTop: 16,
    }}>
      <div style={{ height: 4, background: "linear-gradient(135deg, #D4A017, #E07A5F)" }} />
      <div style={{ padding: "20px 22px" }}>
        <h3 style={{ ...s.serif, fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Before the Weekend</h3>
        {ACTION_ITEMS.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0",
            borderBottom: i < ACTION_ITEMS.length - 1 ? "1px solid #F0EBE3" : "none",
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 6, flexShrink: 0, marginTop: 1,
              border: `2px solid ${item.urgent ? "#C1666B" : "#D6D3D1"}`,
              background: item.urgent ? "#FBE8E9" : "transparent",
            }} />
            <div>
              <div style={{ fontSize: 14, color: "#1C1917", fontWeight: 500 }}>
                {item.text}
                {item.urgent && (
                  <span style={{ marginLeft: 8, fontSize: 9, fontWeight: 700, color: "#C1666B", textTransform: "uppercase", letterSpacing: "1px", padding: "2px 8px", background: "#FBE8E9", borderRadius: 999 }}>
                    Book Now
                  </span>
                )}
              </div>
              {item.detail && <div style={{ fontSize: 12, color: "#A8A29E", marginTop: 3 }}>{item.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Summary View ─── */
function SummaryView() {
  return (
    <div style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ height: 4, background: "linear-gradient(135deg, #1B4965, #2D7D8A, #5F8A6D, #D4A017, #E07A5F)" }} />
        <div style={{ padding: "24px 22px" }}>
          <h2 style={{ ...s.serif, fontSize: 28, marginBottom: 24 }}>At a Glance</h2>

          <div style={{ marginBottom: 28 }}>
            <div style={{ ...s.label, marginBottom: 12 }}>Daily Anchors</div>
            {DAYS.map((day) => (
              <div key={day.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #F0EBE3" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: day.color.grad, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
                  {day.label[0]}
                </div>
                <div>
                  <span style={{ fontWeight: 700, color: "#1C1917", fontSize: 14 }}>{day.label}:</span>{" "}
                  <span style={{ color: "#78716C", fontSize: 14 }}>{day.tagline}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ ...s.label, marginBottom: 12 }}>Weekend Arc</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 15, color: "#44403C" }}>
              {[
                { color: P.friday.grad, text: "Start open + exciting" },
                { color: P.saturday.grad, text: "Middle playful but contained" },
                { color: P.sunday.grad, text: "End calm + meaningful" },
              ].map((arc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: arc.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 500 }}>{arc.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ ...s.label, marginBottom: 12 }}>Design Principles</div>
            <div style={{ color: "#44403C", lineHeight: 1.8, fontFamily: "'Cormorant Garamond', serif", fontSize: 17 }}>
              One anchor activity per day. Morning = movement, afternoon = mellow, evening = wind-down.
              Isabelle naps at noon &mdash; all mornings wrap by 11:30. Quit while fun.
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #E8F3EB, #D4EDDA)", borderRadius: 12, padding: "16px 18px", fontSize: 14, color: "#2D5A3D", lineHeight: 1.6 }}>
            <strong style={{ color: "#1A4A2E" }}>This prevents:</strong> overtired kids, stressed adults, chaotic logistics. Noon nap for Isabelle is sacred.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [expanded, setExpanded] = useState({ friday: true, saturday: false, sunday: false });
  const [view, setView] = useState("plan");
  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 0 60px", minHeight: "100vh" }}>
      <Hero view={view} setView={setView} />

      <div style={{ padding: "0 16px" }}>
        {view === "plan" ? (
          <>
            {/* Design principles */}
            <div className="stagger-2" style={{
              background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 16,
              fontSize: 14, color: "#78716C", lineHeight: 1.7,
              borderLeft: "3px solid #D4A017", boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            }}>
              <strong style={{ color: "#1C1917" }}>Design Principles:</strong> One anchor activity per day.
              Morning = movement, afternoon = mellow, evening = wind-down. Isabelle naps at noon &mdash; all
              mornings wrap by 11:30. Quit while fun.
            </div>

            {DAYS.map((day, i) => (
              <DayCard key={day.id} day={day} isExpanded={expanded[day.id]} onToggle={() => toggle(day.id)} staggerClass={`stagger-${i + 3}`} />
            ))}

            {/* Alt date night */}
            <div className="stagger-6" style={{
              background: "#fff", borderRadius: 12, border: "1px dashed #D6D3D1",
              padding: "16px 20px", marginTop: 4, fontSize: 13, color: "#78716C", lineHeight: 1.7,
            }}>
              <strong style={{ color: "#1C1917" }}>Alt: Saturday Date Night</strong><br />
              If Friday feels rushed &mdash; Kim &amp; Blake do Saturday sunset dinner while Adrian &amp; Alex
              handle pizza + movie night with the kids. More relaxed pace, but everyone more tired and harder
              bedtime logistics. Friday still recommended.
            </div>

            <ActionItems />
          </>
        ) : (
          <SummaryView />
        )}
      </div>
    </div>
  );
}
