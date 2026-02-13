import { useState } from "react";
import "./index.css";

/* ─── Color helpers ─── */
const C = {
  friday:    { main: "#2E7DB5", bg: "#EBF4FB", light: "#D4E9F7" },
  saturday:  { main: "#C78C0A", bg: "#FDF6E3", light: "#F5E6B8" },
  sunday:    { main: "#4E8A35", bg: "#EEF6EB", light: "#D1E8C9" },
  dateNight: { main: "#B84D6A", bg: "#FBEEF2", light: "#F2CED9" },
};

/* ─── Data ─── */
const DAYS = [
  {
    id: "friday",
    label: "Friday",
    tagline: "East Beach Morning + Date Night",
    color: C.friday,
    morning: {
      title: "East Beach Morning",
      location: "East Beach, Santa Barbara",
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
      title: "Nap Time + Recovery",
      items: [
        "Isabelle naps at noon",
        "Older kids: quiet play / drawing / LEGO / screens",
        "Adults rotate downtime \u2014 prep lunch, recharge",
      ],
      note: "Protect energy for date night tonight.",
    },
    evening: {
      title: "Date Night",
      subtitle: "Kim & Blake",
      isDateNight: true,
      plan: [
        "Kim does Isabelle\u2019s bedtime routine before leaving",
        "Walk by the water at sunset \u2014 Shoreline Park for quieter vibes",
        "Relaxed dinner at The Lark",
        "One drink \u2192 home early",
      ],
      restaurant: {
        name: "The Lark",
        topPick: true,
        address: "131 Anacapa St",
        desc: "New American \u00b7 Family-style \u00b7 Historic Fish Market building",
        price: "$50\u2013100/pp",
        highlights: ["Brown butter cornbread", "Crispy Brussels sprouts", "Handmade pappardelle", "Flat iron steak"],
        reserve: "OpenTable / Resy or (805) 284-0370",
        note: "Fire pit patio seating",
      },
      altRestaurant: {
        name: "Loquita",
        address: "202 State St",
        desc: "Spanish Tapas \u00b7 Wood-fired \u00b7 Paella",
        tip: "Request patio \u2014 can be loud inside. Earlier seating for quieter vibe.",
      },
      whyFriday: "Everyone fresh \u00b7 Sets weekend tone \u00b7 Saturday stays family-focused",
    },
    meals: {
      breakfast: { text: "Yogurt, berries, toast, coffee", tip: "Ready by 8:15 \u2014 beach at 9" },
      lunch: { text: "Build-your-own wraps", detail: "Deli turkey, hummus, cheese, veggies, chips \u2014 kids customize" },
      kidsDinner: {
        text: "Sheet Pan Chicken Fajitas w/ Creamy Verde Sauce",
        tip: "Prep before Kim & Blake leave. Season chicken, chop veggies, have it sheet-pan-ready. Slide in oven at 5:30.",
        recipe: true,
      },
      adultDinner: { text: "The Lark (Kim & Blake) \u00b7 Adrian & Alex eat with kids or after bedtime" },
    },
  },
  {
    id: "saturday",
    label: "Saturday",
    tagline: "Lil\u2019 Toot Boat + Cozy Family Night",
    color: C.saturday,
    warning: "Highest-risk meltdown day \u2014 keep expectations low. Protect the noon nap.",
    morning: {
      title: "Lil\u2019 Toot Water Taxi Ride",
      location: "Santa Barbara Harbor",
      time: "10:45 AM departure \u2014 plan to arrive by 10:15",
      details: [
        "Short harbor boat ride \u2014 big hit for all 3 kids",
        "Explore the harbor & breakwater before/after",
        "Watch boats, sea lions, pelicans",
        "Home by noon for Isabelle\u2019s nap",
      ],
      backup: "If sold out: harbor walk + playground at Chase Palm Park",
      tip: "Buy tickets in advance \u2014 Saturday morning slots sell out.",
    },
    afternoon: {
      title: "Nap + Ice Cream Stroll",
      items: [
        "Isabelle naps at noon",
        "Post-nap: ice cream at McConnell\u2019s",
        "Easy downtown walk \u2014 nothing ambitious",
      ],
      note: "Pick ONE post-nap activity. No stacking.",
    },
    evening: {
      title: "Pizza & Movie Night",
      subtitle: "All Together",
      plan: [
        "Store-bought dough (TJ\u2019s / Whole Foods) \u2014 kids top their own pizzas",
        "Let kids choose the movie = emotional win",
        "Adult pizza after kids are down: Sweet & Spicy Pepperoni w/ honey drizzle",
      ],
    },
    meals: {
      breakfast: { text: "Pancakes or eggs", tip: "Assign a cook \u2014 start by 8 if leaving at 9:45" },
      lunch: { text: "Easy tacos", tip: "Lay out taco stuff at 11:30 before nap. Adults eat properly after." },
      dinner: { text: "Homemade pizza + salad" },
    },
  },
  {
    id: "sunday",
    label: "Sunday",
    tagline: "Butterfly Beach + Brunch Send-Off",
    color: C.sunday,
    morning: {
      title: "Butterfly Beach & Tide Pool Scramble",
      location: "Butterfly Beach \u2192 Channel Drive tide pools",
      time: "~9:00\u201311:15 AM \u2014 home by noon for nap",
      details: [
        "Start at Butterfly Beach \u2014 calmer waves, great for littles",
        "Walk east along rocks to explore tide pools at low tide",
        "Sea stars, hermit crabs, anemones \u2014 7-year-old paradise",
        "Split: 2 adults with tide pool crew, 2 with sand crew (Isabelle)",
      ],
      backup: "SB Zoo morning \u2014 stroller-friendly, shaded, contained",
      tip: "Check tide chart \u2014 need low tide below +1 ft. Tide pools not stroller-friendly.",
    },
    afternoon: {
      title: "Brunch Board + Pack Up",
      items: [
        "Start packing BEFORE brunch \u2014 load car while Isabelle naps",
        "Ultimate Spring Brunch Board while she sleeps",
        "Scramble eggs last minute, lay everything out",
        "Slow final sweep, say goodbye",
      ],
      note: "Keep it simple and warm.",
    },
    evening: null,
    meals: {
      brunch: {
        text: "Ultimate Spring Brunch Board",
        detail: "Roasted baby potatoes + crispy bacon on one sheet pan, scrambled eggs, burrata caprese, smoked salmon, bagels, cream cheese, fruit, yogurt, OJ & coffee",
        tip: "Optional: prep Raspberry Ricotta Croissant French Toast Saturday night as a bonus.",
        recipe: true,
      },
    },
  },
];

const ACTION_ITEMS = [
  { text: "Book The Lark \u2014 Friday 7:00 or 7:30 PM", urgent: true, detail: "Resy / OpenTable / (805) 284-0370" },
  { text: "Buy Lil\u2019 Toot tickets \u2014 Saturday 10:45 AM", urgent: true, detail: "Saturday morning sells out" },
  { text: "Check Sunday tide chart", urgent: false, detail: "Need low tide below +1 ft in the morning" },
  { text: "Grocery run", urgent: false, detail: "Thursday night or Friday morning?" },
  { text: "Confirm Kim & Alex departure time Sunday", urgent: false, detail: "Affects whether morning beach happens" },
  { text: "Pack beach gear", urgent: false, detail: "Shade tent, towels, sand toys, sunscreen, rash guards, hats" },
];

/* ─── Components ─── */

function Badge({ children, color, bg }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 11px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        background: bg,
        color: color,
      }}
    >
      {children}
    </span>
  );
}

function SectionBlock({ label, borderColor, children }) {
  return (
    <div style={{ marginBottom: 18, paddingLeft: 16, borderLeft: `3px solid ${borderColor || "#E8E2DA"}` }}>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#A69E95",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontFamily: "'Young Serif', serif", fontSize: 17, color: "#2D2520", marginBottom: 4 }}>
      {children}
    </div>
  );
}

function Meta({ icon, children }) {
  return (
    <div style={{ fontSize: 13, color: "#7D7168", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 14, color: "#4A433D", lineHeight: 1.8 }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Note({ children }) {
  return <div style={{ marginTop: 8, fontSize: 13, color: "#7D7168", fontStyle: "italic" }}>{children}</div>;
}

function Backup({ children }) {
  return <div style={{ marginTop: 8, fontSize: 13, color: "#A69E95", fontStyle: "italic" }}>Backup: {children}</div>;
}

function Tip({ children, color }) {
  return (
    <div
      style={{
        marginTop: 8,
        fontSize: 12,
        color: color || "#7D7168",
        background: color ? `${color}10` : "#FAF7F2",
        padding: "6px 10px",
        borderRadius: 8,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

function RestaurantCard({ restaurant, dayColor }) {
  return (
    <div
      style={{
        borderRadius: 10,
        padding: "14px 16px",
        marginTop: 10,
        border: `1px solid ${dayColor.light}`,
        background: dayColor.bg,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Young Serif', serif", fontSize: 16, color: "#2D2520" }}>
          {restaurant.name}
        </span>
        {restaurant.topPick && <Badge color={C.dateNight.main} bg={C.dateNight.bg}>Top Pick</Badge>}
      </div>
      <div style={{ fontSize: 12, color: "#7D7168", lineHeight: 1.6 }}>
        {restaurant.desc} &middot; {restaurant.price}
        {restaurant.note && <> &middot; {restaurant.note}</>}
      </div>
      {restaurant.highlights && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
          {restaurant.highlights.map((h, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 999,
                fontWeight: 500,
                background: "#fff",
                color: "#7D7168",
                border: `1px solid ${dayColor.light}`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      )}
      {restaurant.reserve && (
        <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: C.dateNight.main }}>
          Reserve: {restaurant.reserve}
        </div>
      )}
    </div>
  );
}

function AltRestaurant({ alt }) {
  return (
    <div
      style={{
        marginTop: 8,
        fontSize: 12,
        color: "#7D7168",
        padding: "8px 12px",
        borderRadius: 8,
        background: "#FAF7F2",
        border: "1px dashed #E8E2DA",
      }}
    >
      <strong style={{ color: "#2D2520" }}>Alt: {alt.name}</strong> ({alt.address}) &mdash; {alt.desc}
      {alt.tip && <div style={{ marginTop: 3, fontStyle: "italic", color: "#A69E95" }}>{alt.tip}</div>}
    </div>
  );
}

function RecipeCard({ title, tip, dayColor }) {
  return (
    <div
      style={{
        borderRadius: 10,
        padding: "10px 14px",
        marginTop: 8,
        background: dayColor.bg,
        border: `1px solid ${dayColor.light}`,
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      <div style={{ fontWeight: 600, color: "#2D2520", marginBottom: 2 }}>{title}</div>
      {tip && <div style={{ fontSize: 12, fontStyle: "italic", color: "#7D7168" }}>{tip}</div>}
    </div>
  );
}

function MealsGrid({ meals, dayColor }) {
  const entries = Object.entries(meals);
  return (
    <div style={{ background: "#FAFAF7", borderRadius: 10, padding: "14px 16px", marginTop: 6 }}>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#A69E95",
          marginBottom: 10,
        }}
      >
        Meals
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {entries.map(([key, val]) => (
          <div key={key} style={{ fontSize: 13, color: "#4A433D" }}>
            <strong style={{ color: "#7D7168", fontWeight: 600, fontSize: 12, textTransform: "capitalize" }}>
              {key === "kidsDinner" ? "Kids Dinner" : key === "adultDinner" ? "Adult Dinner" : key}:
            </strong>{" "}
            {val.text}
            {val.detail && <div style={{ fontSize: 12, color: "#A69E95", marginTop: 2 }}>{val.detail}</div>}
            {val.tip && <Tip color={dayColor.main}>{val.tip}</Tip>}
            {val.recipe && <RecipeCard title={val.text} tip={val.tip} dayColor={dayColor} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function DayCard({ day, isExpanded, onToggle, staggerClass }) {
  return (
    <div
      className={staggerClass}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #F0EBE5",
        overflow: "hidden",
        marginBottom: 14,
        boxShadow: isExpanded ? "0 4px 16px rgba(45,37,32,0.08)" : "0 1px 3px rgba(45,37,32,0.06)",
        transition: "box-shadow 0.25s",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: day.color.main,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontFamily: "'Young Serif', serif", fontSize: 20, color: "#2D2520" }}>{day.label}</div>
            <div style={{ fontSize: 13, color: "#7D7168", marginTop: 1 }}>{day.tagline}</div>
          </div>
        </div>
        <span
          style={{
            fontSize: 18,
            color: "#A69E95",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.25s ease",
            flexShrink: 0,
          }}
        >
          &#9662;
        </span>
      </button>

      {isExpanded && (
        <div style={{ padding: "0 20px 22px", animation: "fadeSlideIn 0.3s ease-out" }}>
          {/* Warning */}
          {day.warning && (
            <div
              style={{
                background: "#FEF7E6",
                border: "1px solid #F3DFA0",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                fontWeight: 500,
                color: "#92400E",
                marginBottom: 18,
                lineHeight: 1.5,
              }}
            >
              {day.warning}
            </div>
          )}

          {/* Morning */}
          <SectionBlock label="Morning \u2014 Primary Adventure" borderColor={day.color.main}>
            <SectionTitle>{day.morning.title}</SectionTitle>
            {day.morning.location && <Meta icon="\ud83d\udccd">{day.morning.location}</Meta>}
            <Meta icon="\u23f1">{day.morning.time}</Meta>
            <BulletList items={day.morning.details} />
            {day.morning.backup && <Backup>{day.morning.backup}</Backup>}
            {day.morning.tip && <Tip color={day.color.main}>{day.morning.tip}</Tip>}
          </SectionBlock>

          {/* Afternoon */}
          <SectionBlock label="Afternoon" borderColor="#E8E2DA">
            <SectionTitle>{day.afternoon.title}</SectionTitle>
            <BulletList items={day.afternoon.items} />
            {day.afternoon.note && <Note>{day.afternoon.note}</Note>}
          </SectionBlock>

          {/* Evening */}
          {day.evening && (
            <SectionBlock
              label="Evening"
              borderColor={day.evening.isDateNight ? C.dateNight.main : "#E8E2DA"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <SectionTitle>{day.evening.title}</SectionTitle>
                {day.evening.isDateNight && (
                  <Badge color={C.dateNight.main} bg={C.dateNight.bg}>
                    Date Night
                  </Badge>
                )}
              </div>
              {day.evening.subtitle && (
                <div style={{ fontSize: 13, color: "#7D7168", marginBottom: 4 }}>{day.evening.subtitle}</div>
              )}
              <BulletList items={day.evening.plan} />
              {day.evening.restaurant && (
                <RestaurantCard restaurant={day.evening.restaurant} dayColor={C.dateNight} />
              )}
              {day.evening.altRestaurant && <AltRestaurant alt={day.evening.altRestaurant} />}
              {day.evening.whyFriday && (
                <div style={{ marginTop: 8, fontSize: 12, color: "#A69E95" }}>
                  {day.evening.whyFriday}
                </div>
              )}
            </SectionBlock>
          )}

          {/* Meals */}
          <MealsGrid meals={day.meals} dayColor={day.color} />
        </div>
      )}
    </div>
  );
}

function ActionItems() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #F0EBE5",
        boxShadow: "0 1px 3px rgba(45,37,32,0.06)",
        padding: "18px 20px",
        marginTop: 14,
        animation: "staggerIn 0.5s ease-out 0.55s both",
      }}
    >
      <h3 style={{ fontSize: 17, marginBottom: 14 }}>Before the Weekend</h3>
      {ACTION_ITEMS.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "9px 0",
            borderBottom: i < ACTION_ITEMS.length - 1 ? "1px solid #F0EBE5" : "none",
            fontSize: 14,
            color: "#4A433D",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: `2px solid ${item.urgent ? C.dateNight.main : "#A69E95"}`,
              flexShrink: 0,
              marginTop: 6,
            }}
          />
          <div>
            <div>
              {item.text}
              {item.urgent && (
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.dateNight.main,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Book Now
                </span>
              )}
            </div>
            {item.detail && <div style={{ fontSize: 12, color: "#A69E95", marginTop: 2 }}>{item.detail}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SummaryView() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #F0EBE5",
        boxShadow: "0 1px 3px rgba(45,37,32,0.06)",
        padding: "22px 20px",
        animation: "fadeSlideIn 0.3s ease-out",
      }}
    >
      <h2 style={{ fontSize: 22, marginBottom: 20 }}>At a Glance</h2>

      {/* Daily anchors */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#A69E95",
            marginBottom: 10,
          }}
        >
          Daily Anchors
        </div>
        {DAYS.map((day) => (
          <div
            key={day.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: "1px solid #F0EBE5",
            }}
          >
            <div
              style={{ width: 10, height: 10, borderRadius: "50%", background: day.color.main, flexShrink: 0 }}
            />
            <div>
              <span style={{ fontWeight: 600, color: "#2D2520", fontSize: 14 }}>{day.label}:</span>{" "}
              <span style={{ color: "#7D7168", fontSize: 14 }}>{day.tagline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Emotional arc */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#A69E95",
            marginBottom: 10,
          }}
        >
          Weekend Arc
        </div>
        <div style={{ fontSize: 14, color: "#4A433D", lineHeight: 2.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.friday.main }} />
            <span>Start open + exciting</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.saturday.main }} />
            <span>Middle playful but contained</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.sunday.main }} />
            <span>End calm + meaningful</span>
          </div>
        </div>
      </div>

      {/* Design principles */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#A69E95",
            marginBottom: 10,
          }}
        >
          Design Principles
        </div>
        <div style={{ fontSize: 14, color: "#4A433D", lineHeight: 1.8 }}>
          One anchor activity per day. Morning = movement, afternoon = mellow, evening = wind-down.
          Isabelle naps at noon &mdash; all mornings wrap by 11:30. Quit while fun.
        </div>
      </div>

      {/* Prevention */}
      <div
        style={{
          background: "#F0FAF0",
          borderRadius: 10,
          padding: "14px 16px",
          fontSize: 13,
          color: "#1A6B3C",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#15613A" }}>This prevents:</strong> overtired kids, stressed adults,
        chaotic logistics. Noon nap for Isabelle is sacred.
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
    <div className="app" style={{ maxWidth: 620, margin: "0 auto", padding: "24px 16px 60px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, animation: "staggerIn 0.6s ease-out" }}>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#A69E95",
            marginBottom: 6,
          }}
        >
          Family Weekend Plan
        </div>
        <h1 style={{ fontSize: 32, color: "#2D2520", marginBottom: 6 }}>Santa Barbara Weekend</h1>
        <div style={{ fontSize: 14, color: "#7D7168", lineHeight: 1.5 }}>
          Kim &amp; Alex + Adrian &amp; Blake &middot; 3 kids &middot; One adventure/day &middot; Date night
        </div>
      </div>

      {/* View toggle */}
      <div
        style={{
          display: "flex",
          gap: 3,
          background: "#E8E2DA",
          borderRadius: 10,
          padding: 3,
          marginBottom: 20,
          width: "fit-content",
          animation: "staggerIn 0.6s ease-out 0.1s both",
        }}
      >
        {["plan", "summary"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              padding: "7px 18px",
              borderRadius: 8,
              border: "none",
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              background: view === v ? "#fff" : "transparent",
              color: view === v ? "#2D2520" : "#7D7168",
              boxShadow: view === v ? "0 1px 4px rgba(45,37,32,0.1)" : "none",
              transition: "all 0.2s",
            }}
          >
            {v === "plan" ? "Full Plan" : "Summary"}
          </button>
        ))}
      </div>

      {view === "plan" ? (
        <>
          {/* Design principles */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #F0EBE5",
              boxShadow: "0 1px 3px rgba(45,37,32,0.06)",
              padding: "16px 20px",
              marginBottom: 14,
              fontSize: 13,
              color: "#7D7168",
              lineHeight: 1.7,
              animation: "staggerIn 0.5s ease-out 0.15s both",
            }}
          >
            <strong style={{ color: "#2D2520" }}>Design Principles:</strong> One anchor activity per day.
            Morning = movement, afternoon = mellow, evening = wind-down. Isabelle naps at noon &mdash; all
            mornings wrap by 11:30. Quit while fun.
          </div>

          {/* Day cards */}
          {DAYS.map((day, i) => (
            <DayCard
              key={day.id}
              day={day}
              isExpanded={expanded[day.id]}
              onToggle={() => toggle(day.id)}
              staggerClass={`stagger-${i + 2}`}
            />
          ))}

          {/* Alt date night */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px dashed #E8E2DA",
              padding: "16px 20px",
              marginTop: 10,
              fontSize: 13,
              color: "#7D7168",
              lineHeight: 1.7,
              animation: "staggerIn 0.5s ease-out 0.5s both",
            }}
          >
            <strong style={{ color: "#2D2520" }}>Alt: Saturday Date Night</strong>
            <br />
            If Friday feels rushed &mdash; Kim &amp; Blake do Saturday sunset dinner while Adrian &amp; Alex
            handle pizza + movie night with the kids. More relaxed pace, but everyone more tired and harder
            bedtime logistics. Friday still recommended.
          </div>

          {/* Action items */}
          <ActionItems />
        </>
      ) : (
        <SummaryView />
      )}
    </div>
  );
}
