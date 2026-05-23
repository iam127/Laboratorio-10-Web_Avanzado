// src/app/pokemon/[name]/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PokemonPageProps {
  params: { name: string };
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) notFound();
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data: PokemonListResponse = await res.json();
  return data.results.map((p) => ({ name: p.name }));
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  return {
    title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédex`,
    description: `Información sobre ${pokemon.name}`,
  };
}

const typeConfig: Record<string, { bg: string; dark: string; text: string }> = {
  fire:     { bg: '#FF6B35', dark: '#CC4400', text: '#FFF0EB' },
  water:    { bg: '#4A90D9', dark: '#2255AA', text: '#EBF4FF' },
  grass:    { bg: '#38B86E', dark: '#1A7A40', text: '#EBFAF2' },
  electric: { bg: '#EDB83D', dark: '#AA7700', text: '#FFFAEB' },
  psychic:  { bg: '#E91E8C', dark: '#AA0055', text: '#FFEBF5' },
  ice:      { bg: '#00BCD4', dark: '#007A8A', text: '#EBFAFF' },
  dragon:   { bg: '#7B2FBE', dark: '#4A007A', text: '#F5EBFF' },
  dark:     { bg: '#455A64', dark: '#1C2D35', text: '#EBF0F2' },
  fairy:    { bg: '#F06292', dark: '#AA2255', text: '#FFEBF2' },
  normal:   { bg: '#8D9DB6', dark: '#556070', text: '#F0F2F5' },
  fighting: { bg: '#D32F2F', dark: '#8A0000', text: '#FFEBEB' },
  flying:   { bg: '#5C6BC0', dark: '#2A3A8A', text: '#EBEBFF' },
  poison:   { bg: '#9C27B0', dark: '#5A007A', text: '#F5EBFF' },
  ground:   { bg: '#C8A84B', dark: '#8A6500', text: '#FFF8EB' },
  rock:     { bg: '#A0522D', dark: '#5A2000', text: '#FFF0EB' },
  bug:      { bg: '#7CB342', dark: '#3A6A00', text: '#F2FFEB' },
  ghost:    { bg: '#5E35B1', dark: '#2A007A', text: '#F0EBFF' },
  steel:    { bg: '#607D8B', dark: '#2A4A5A', text: '#EBF2F5' },
};

const statNames: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Sp. Atq',
  'special-defense': 'Sp. Def',
  speed: 'Velocidad',
};

export default async function PokemonDetail({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  const mainType = pokemon.types[0].type.name;
  const cfg = typeConfig[mainType] || typeConfig.normal;
  const total = pokemon.stats.reduce((a, s) => a + s.base_stat, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827' }}>

      {/* ── HEADER CARD ── */}
      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: cfg.dark }}>

        {/* Fondo decorativo */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          backgroundColor: cfg.bg, opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '30%',
          width: '300px', height: '300px', borderRadius: '50%',
          backgroundColor: cfg.bg, opacity: 0.08,
        }} />

        {/* Número gigante de fondo */}
        <div style={{
          position: 'absolute', right: '2rem', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '12rem', fontWeight: 900, lineHeight: 1,
          color: '#ffffff', opacity: 0.04, userSelect: 'none',
          fontFamily: 'monospace',
        }}>
          {pokemon.id.toString().padStart(3, '0')}
        </div>

        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 2rem 0' }}>

          {/* Botón volver */}
          <Link href="/pokemon" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: '#ffffff', opacity: 0.7, fontSize: '0.85rem',
            fontWeight: 600, textDecoration: 'none', marginBottom: '1.5rem',
            transition: 'opacity 0.2s',
          }}>
            ← Volver al Pokédex
          </Link>

          {/* Layout: info + imagen */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>

            {/* Info */}
            <div style={{ flex: 1, minWidth: '280px', paddingBottom: '2rem' }}>
              <p style={{ color: cfg.bg, fontSize: '0.8rem', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
              <h1 style={{
                color: '#ffffff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900, textTransform: 'capitalize',
                lineHeight: 1, marginBottom: '1.25rem',
                textShadow: `0 0 40px ${cfg.bg}66`,
              }}>
                {pokemon.name}
              </h1>

              {/* Tipos */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {pokemon.types.map((t) => {
                  const tc = typeConfig[t.type.name] || typeConfig.normal;
                  return (
                    <span key={t.type.name} style={{
                      backgroundColor: tc.bg,
                      color: '#fff',
                      padding: '0.4rem 1.2rem',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      boxShadow: `0 4px 15px ${tc.bg}66`,
                    }}>
                      {t.type.name}
                    </span>
                  );
                })}
              </div>

              {/* Altura y Peso */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { label: 'Altura', value: `${pokemon.height / 10} m` },
                  { label: 'Peso', value: `${pokemon.weight / 10} kg` },
                ].map((item) => (
                  <div key={item.label} style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '0.75rem 1.5rem',
                    textAlign: 'center',
                    border: `1px solid rgba(255,255,255,0.1)`,
                  }}>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem',
                      textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2px' }}>
                      {item.label}
                    </p>
                    <p style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen Pokémon */}
            <div style={{ flexShrink: 0, position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '220px', height: '50px', borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                filter: 'blur(20px)',
              }} />
              <Image
                width={260}
                height={260}
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                priority
                style={{
                  display: 'block',
                  filter: `drop-shadow(0 20px 40px ${cfg.bg}88)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENIDO ── */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>

          {/* ESTADÍSTICAS */}
          <div style={{
            backgroundColor: '#1F2937',
            borderRadius: '24px',
            padding: '2rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#F9FAFB', fontWeight: 800, fontSize: '1rem',
                textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Estadísticas Base
              </h2>
              <span style={{
                backgroundColor: cfg.bg, color: '#fff',
                borderRadius: '999px', padding: '0.3rem 1rem',
                fontSize: '0.8rem', fontWeight: 800,
                boxShadow: `0 4px 12px ${cfg.bg}55`,
              }}>
                Total {total}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pokemon.stats.map((stat) => {
                const pct = Math.round((stat.base_stat / 255) * 100);
                const label = statNames[stat.stat.name] || stat.stat.name;
                return (
                  <div key={stat.stat.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '0.75rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em', width: '80px', flexShrink: 0 }}>
                      {label}
                    </span>
                    <span style={{ color: cfg.bg, fontWeight: 900, fontSize: '0.95rem',
                      width: '36px', textAlign: 'right', flexShrink: 0 }}>
                      {stat.base_stat}
                    </span>
                    <div style={{ flex: 1, backgroundColor: '#374151', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`, height: '100%', borderRadius: '999px',
                        backgroundColor: cfg.bg,
                        boxShadow: `0 0 8px ${cfg.bg}88`,
                      }} />
                    </div>
                    <span style={{ color: '#4B5563', fontSize: '0.7rem', width: '32px', flexShrink: 0 }}>
                      /255
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Habilidades */}
            <div style={{ backgroundColor: '#1F2937', borderRadius: '24px', padding: '1.5rem' }}>
              <h2 style={{ color: '#F9FAFB', fontWeight: 800, fontSize: '0.85rem',
                textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
                Habilidades
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {pokemon.abilities.map((a) => (
                  <div key={a.ability.name} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: '#374151', borderRadius: '14px',
                    padding: '0.75rem 1rem',
                    border: `1px solid ${cfg.bg}33`,
                  }}>
                    <span style={{ color: '#E5E7EB', fontWeight: 600,
                      fontSize: '0.9rem', textTransform: 'capitalize' }}>
                      {a.ability.name.replace('-', ' ')}
                    </span>
                    {a.is_hidden && (
                      <span style={{
                        backgroundColor: cfg.bg, color: '#fff',
                        fontSize: '0.65rem', fontWeight: 800,
                        padding: '2px 10px', borderRadius: '999px',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                      }}>
                        Oculta
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sprite */}
            <div style={{ backgroundColor: '#1F2937', borderRadius: '24px', padding: '1.5rem' }}>
              <h2 style={{ color: '#F9FAFB', fontWeight: 800, fontSize: '0.85rem',
                textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
                Sprite
              </h2>
              <div style={{
                backgroundColor: '#374151', borderRadius: '16px',
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', padding: '1rem',
                border: `1px solid ${cfg.bg}33`,
              }}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}