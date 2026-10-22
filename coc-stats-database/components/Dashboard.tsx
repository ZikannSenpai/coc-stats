"use client";
import { useMemo, useState } from "react";
import {
    Search,
    Swords,
    Shield,
    Sparkles,
    Users,
    Crosshair,
    ChevronRight,
    Calculator,
    Database,
    SlidersHorizontal,
    Info
} from "lucide-react";
import { categories, items } from "@/lib/data";
import type { GameItem, LevelStats } from "@/lib/types";
const iconFor = (c: string) =>
    c === "gear" ? (
        <Sparkles size={17} />
    ) : c === "spell" ? (
        <Swords size={17} />
    ) : c === "troop" ? (
        <Users size={17} />
    ) : (
        <Shield size={17} />
    );
const labels: Record<string, string> = {
    gear: "Hero Gear",
    spell: "Spell",
    troop: "Troop",
    hero: "Hero"
};
function getStats(item: GameItem, level: number): LevelStats {
    const sorted = [...item.stats].sort((a, b) => a.level - b.level);
    const result: Record<string, string | number | undefined> = {};

    for (const row of sorted) {
        if (row.level > level) break;

        for (const [key, value] of Object.entries(row)) {
            result[key] = value;
        }
    }

    return result as LevelStats;
}
export default function Dashboard() {
    const [category, setCategory] = useState("all"),
        [query, setQuery] = useState(""),
        [selectedId, setSelectedId] = useState(items[0].id),
        [level, setLevel] = useState(1),
        [baseHp, setBaseHp] = useState("5600"),
        [quakePercent, setQuakePercent] = useState("29"),
        [quakeCount, setQuakeCount] = useState("3"),
        [mobileMenu, setMobileMenu] = useState(false);
    const filtered = useMemo(
        () =>
            items.filter(
                i =>
                    (category === "all" || i.category === category) &&
                    `${i.name} ${i.hero} ${i.rarity} ${i.tags.join(" ")}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
            ),
        [category, query]
    );
    const selected =
            items.find(i => i.id === selectedId) ?? filtered[0] ?? items[0],
        selectedLevel = Math.min(Math.max(level, 1), selected.maxLevel),
        stats = getStats(selected, selectedLevel);
    const changeCategory = (id: string) => {
        setCategory(id);
        const next = items.find(i => id === "all" || i.category === id);
        if (next) {
            setSelectedId(next.id);
            setLevel(1);
        }
        setMobileMenu(false);
    };
    const damage = Math.round(
        (Number(baseHp || 0) * Number(quakePercent || 0)) / 100
    );
    return (
        <main className="app-shell">
            <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
                <div className="brand">
                    <div className="brand-mark">
                        <Swords size={23} />
                    </div>
                    <div>
                        <b>CLASH INTEL</b>
                        <small>COMMUNITY DATABASE</small>
                    </div>
                </div>
                <div className="side-label">DATABASE</div>
                <nav>
                    {categories.map(c => (
                        <button
                            key={c.id}
                            className={`nav-item ${
                                category === c.id ? "active" : ""
                            }`}
                            onClick={() => changeCategory(c.id)}
                        >
                            {iconFor(c.id === "all" ? "gear" : c.id)}
                            <span>{c.label}</span>
                            {category === c.id && <ChevronRight size={15} />}
                        </button>
                    ))}
                </nav>
                <div className="sidebar-bottom">
                    <div className="online-dot" /> <span>WAR ROOM</span>
                    <small>v1.0.0</small>
                </div>
            </aside>
            <section className="main-area">
                <header className="topbar">
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        ☰
                    </button>
                    <div className="breadcrumb">
                        DATABASE <span>/</span>{" "}
                        <b>
                            {categories
                                .find(c => c.id === category)
                                ?.label.toUpperCase()}
                        </b>
                    </div>
                    <div className="top-status">
                        <span className="status-dot" /> WAR RESEARCH MODE
                    </div>
                </header>
                <div className="content">
                    <section className="hero">
                        <div className="hero-copy">
                            <div className="eyebrow">
                                <span /> CLASH OF CLANS / INTELLIGENCE
                            </div>
                            <h1>
                                Know the numbers.
                                <br />
                                <em>Win the war.</em>
                            </h1>
                            <p>
                                Referensi statistik gear, spell, troop, dan hero
                                buat nyusun strategi war tanpa bolak-balik cari
                                data.
                            </p>
                            <div className="hero-tags">
                                <span>
                                    <Database size={14} /> STAT DATABASE
                                </span>
                                <span>
                                    <Crosshair size={14} /> WAR PLANNING
                                </span>
                            </div>
                        </div>
                        <div className="hero-graphic">
                            <div className="ring ring-one" />
                            <div className="ring ring-two" />
                            <div className="crosshair">
                                <Swords size={76} />
                            </div>
                            <span className="coord coord-a">TH / INTEL</span>
                            <span className="coord coord-b">01 : 04</span>
                        </div>
                    </section>
                    <section className="overview-grid">
                        {[
                            [
                                "DATABASE ENTRIES",
                                String(items.length).padStart(2, "0")
                            ],
                            ["CATEGORIES", "04"],
                            [
                                "GEAR RECORDS",
                                String(
                                    items.filter(i => i.category === "gear")
                                        .length
                                ).padStart(2, "0")
                            ],
                            ["WAR TOOLS", "01"]
                        ].map(([a, b]) => (
                            <div className="stat-card" key={a}>
                                <span>{a}</span>
                                <strong>{b}</strong>
                            </div>
                        ))}
                    </section>
                    <div className="section-heading">
                        <div>
                            <span className="section-kicker">FIELD INDEX</span>
                            <h2>Stat Database</h2>
                        </div>
                        <span className="record-count">
                            {filtered.length} RECORDS FOUND
                        </span>
                    </div>
                    <section className="database-layout">
                        <div className="list-panel">
                            <div className="search-wrap">
                                <Search size={17} />
                                <input
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Cari gear, spell, troop..."
                                />
                                <SlidersHorizontal size={16} />
                            </div>
                            <div className="category-pills">
                                {categories.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => changeCategory(c.id)}
                                        className={
                                            category === c.id ? "chosen" : ""
                                        }
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                            <div className="item-list">
                                {filtered.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedId(item.id);
                                            setLevel(1);
                                        }}
                                        className={`item-row ${
                                            selected.id === item.id
                                                ? "selected"
                                                : ""
                                        }`}
                                    >
                                        <div
                                            className={`item-icon ${item.category}`}
                                        >
                                            {iconFor(item.category)}
                                        </div>
                                        <div className="item-info">
                                            <b>{item.name}</b>
                                            <span>
                                                {labels[item.category]} ·{" "}
                                                {item.hero}
                                            </span>
                                        </div>
                                        <div className="item-level">
                                            <b>{item.maxLevel}</b>
                                            <span>MAX LVL</span>
                                        </div>
                                    </button>
                                ))}
                                {filtered.length === 0 && (
                                    <div className="empty">
                                        Data nggak ketemu. Coba kata kunci lain.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="detail-panel">
                            <div className="detail-top">
                                <div>
                                    <span className="section-kicker">
                                        ITEM INTELLIGENCE
                                    </span>
                                    <div className="detail-title">
                                        <div
                                            className={`detail-icon ${selected.category}`}
                                        >
                                            {iconFor(selected.category)}
                                        </div>
                                        <div>
                                            <h3>{selected.name}</h3>
                                            <span>
                                                {labels[selected.category]} /{" "}
                                                {selected.hero}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className="rarity">
                                    {selected.rarity}
                                </span>
                            </div>
                            <p className="description">
                                {selected.description}
                            </p>
                            <div className="level-control">
                                <div>
                                    <span className="section-kicker">
                                        LEVEL SELECTOR
                                    </span>
                                    <b>
                                        Level {selectedLevel}{" "}
                                        <small>/ {selected.maxLevel}</small>
                                    </b>
                                </div>
                                <input
                                    aria-label="Pilih level"
                                    type="range"
                                    min="1"
                                    max={selected.maxLevel}
                                    value={selectedLevel}
                                    onChange={e =>
                                        setLevel(Number(e.target.value))
                                    }
                                />
                                <div className="level-ends">
                                    <span>LVL 1</span>
                                    <span>LVL {selected.maxLevel} MAX</span>
                                </div>
                            </div>
                            <div className="stats-head">
                                <h4>STATISTICS</h4>
                                <span>LEVEL {selectedLevel}</span>
                            </div>
                            <div className="stats-grid">
                                {Object.entries(stats)
                                    .filter(
                                        ([key, value]) =>
                                            key !== "level" &&
                                            value !== undefined &&
                                            value !== null
                                    )
                                    .map(([key, value]) => (
                                        <div className="data-stat" key={key}>
                                            <span>
                                                {key === "totalAttack"
                                                    ? "Total Attack"
                                                    : key.replace(
                                                          /([A-Z])/g,
                                                          " $1"
                                                      )}
                                            </span>
                                            <strong>{value}</strong>
                                        </div>
                                    ))}
                            </div>
                            <div className="level-note">
                                <Info size={15} />
                                <span>
                                    Slider memakai titik data terdekat yang
                                    tersedia. Tambahkan data tiap level di{" "}
                                    <code>data/items.json</code>.
                                </span>
                            </div>
                            <div className="tags">
                                {selected.tags.map(t => (
                                    <span key={t}>#{t}</span>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="section-heading tool-heading">
                        <div>
                            <span className="section-kicker">
                                ATTACK PLANNER
                            </span>
                            <h2>Quick Damage Calculator</h2>
                        </div>
                        <span className="record-count">BETA TOOL</span>
                    </section>
                    <section className="calculator">
                        <div className="calc-intro">
                            <div className="calc-icon">
                                <Calculator size={23} />
                            </div>
                            <h3>Earthquake Spell</h3>
                            <p>
                                Estimasi satu cast dari persentase HP yang kamu
                                input. Jumlah cast belum menerapkan diminishing
                                returns resmi.
                            </p>
                        </div>
                        <div className="calc-fields">
                            <label>
                                Building HP
                                <input
                                    type="number"
                                    min="0"
                                    value={baseHp}
                                    onChange={e => setBaseHp(e.target.value)}
                                />
                            </label>
                            <label>
                                Damage per cast (%)
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={quakePercent}
                                    onChange={e =>
                                        setQuakePercent(e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Jumlah cast
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={quakeCount}
                                    onChange={e =>
                                        setQuakeCount(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div className="calc-result">
                            <span>ESTIMATED DAMAGE / CAST</span>
                            <strong>{damage.toLocaleString("id-ID")}</strong>
                            <small>
                                HP awal:{" "}
                                {Number(baseHp || 0).toLocaleString("id-ID")} ·{" "}
                                {quakePercent}% dari HP awal · {quakeCount} cast
                                dipilih
                            </small>
                        </div>
                    </section>
                    <footer>
                        <div className="footer-brand">
                            <Swords size={17} /> CLASH INTEL
                        </div>
                        <p>
                            Fan-made research tool. Not affiliated with
                            Supercell.
                        </p>
                        <span>STARTER DATA / VERIFY BEFORE WAR</span>
                    </footer>
                </div>
            </section>
        </main>
    );
}
