"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Search, Home, Library, ChevronRight } from "lucide-react";

// 1. BANCO DE DADOS LOCAL (Exemplo de estrutura com IDs de Playlists do YouTube)
const Gêneros = ["Forró", "Sertanejo", "Piseiro", "Vaquejada", "São João"];

const PlaylistsBrasil = [
  {
    id: "1",
    titulo: "Xand Avião - Repertório Novo",
    genero: "Forró",
    capa: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
    youtubePlaylistId: "PL_exemplo_xand_aviao"
  },
  {
    id: "2",
    titulo: "Paredão de Piseiro 2026",
    genero: "Piseiro",
    capa: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92b?q=80&w=400&auto=format&fit=crop",
    youtubePlaylistId: "PL_exemplo_piseiro"
  },
  {
    id: "3",
    titulo: "Modão Sertanejo",
    genero: "Sertanejo",
    capa: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop",
    youtubePlaylistId: "PL_exemplo_sertanejo"
  },
  {
    id: "4",
    titulo: "Vaquejadas AO VIVO",
    genero: "Vaquejada",
    capa: "https://images.unsplash.com/photo-1520627958934-80fc474da1fb?q=80&w=400&auto=format&fit=crop",
    youtubePlaylistId: "PL_exemplo_vaquejada"
  }
];

export default function AplicativoDeMusica() {
  const [generoAtivo, setGeneroAtivo] = useState("Forró");
  const [playlistAtiva, setPlaylistAtiva] = useState(null);
  const [tocando, setTocando] = useState(false);
  const playerRef = useRef(null);

  // Filtra as playlists com base na categoria (tag) selecionada
  const playlistsFiltradas = PlaylistsBrasil.filter(
    (p) => p.genero === generoAtivo
  );

  // Função para simular o Play na Playlist Inteira
  const iniciarPlaylist = (playlist) => {
    setPlaylistAtiva(playlist);
    setTocando(true);
    // Aqui entra a lógica da YouTube Iframe API:
    // playerRef.current.loadPlaylist({ list: playlist.youtubePlaylistId });
  };

  const alternarPlayPause = () => {
    setTocando(!tocando);
    // Aqui comunica com a API do YouTube para pausar/tocar
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white pb-24 font-sans selection:bg-zinc-800">
      
      {/* CABEÇALHO */}
      <header className="pt-12 pb-4 px-4 sticky top-0 bg-zinc-950/90 backdrop-blur-md z-10">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Descobrir</h1>
        
        {/* CATEGORIAS (TAGS) - Carrossel Expansivo Horizontal */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 [&::-webkit-scrollbar]:hidden">
          {Gêneros.map((genero) => (
            <button
              key={genero}
              onClick={() => setGeneroAtivo(genero)}
              className={`snap-start px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                generoAtivo === genero
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {genero}
            </button>
          ))}
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL - Listagem de Playlists */}
      <main className="px-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{generoAtivo} em Alta</h2>
          <ChevronRight className="w-6 h-6 text-zinc-400" />
        </div>

        {/* CARROSSEL DE PLAYLISTS - Expansivo e fluido para iOS */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 [&::-webkit-scrollbar]:hidden">
          {playlistsFiltradas.map((playlist) => (
            <div 
              key={playlist.id} 
              className="snap-start flex-shrink-0 w-40 cursor-pointer group"
              onClick={() => iniciarPlaylist(playlist)}
            >
              <div className="relative aspect-square mb-3 rounded-lg overflow-hidden shadow-lg bg-zinc-800">
                <img 
                  src={playlist.capa} 
                  alt={playlist.titulo}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <button className="absolute bottom-2 right-2 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md">
                  <Play className="w-5 h-5 fill-black" />
                </button>
              </div>
              <h3 className="text-sm font-semibold truncate">{playlist.titulo}</h3>
              <p className="text-xs text-zinc-400 truncate">Playlist • {playlist.genero}</p>
            </div>
          ))}
        </div>
      </main>

      {/* PLAYER OCULTO DO YOUTUBE */}
      <div id="youtube-player-container" className="hidden">
         {/* O Iframe invisível do YouTube será injetado aqui */}
      </div>

      {/* PLAYER INFERIOR FIXO (Design Profissional PWA) */}
      {playlistAtiva && (
        <div className="fixed bottom-[72px] left-2 right-2 bg-zinc-900 rounded-lg p-2 flex items-center justify-between shadow-2xl border border-zinc-800 z-40">
          <div className="flex items-center gap-3 overflow-hidden">
            <img 
              src={playlistAtiva.capa} 
              alt="Capa" 
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold truncate">{playlistAtiva.titulo}</span>
              <span className="text-xs text-zinc-400">Rádio {playlistAtiva.genero}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pr-2">
            <button className="text-zinc-300 hover:text-white transition">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={alternarPlayPause}
              className="text-white flex items-center justify-center"
            >
              {tocando ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>
            <button className="text-zinc-300 hover:text-white transition">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      )}

      {/* BARRA DE NAVEGAÇÃO INFERIOR (Estilo Aplicativo Nativo) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <button className="flex flex-col items-center gap-1 text-white">
            <Home className="w-6 h-6" />
            <span className="text-[10px]">Início</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Search className="w-6 h-6" />
            <span className="text-[10px]">Buscar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Library className="w-6 h-6" />
            <span className="text-[10px]">Biblioteca</span>
          </button>
        </div>
      </nav>

      {/* CSS extra para garantir que a barra inferior do iPhone não corte o layout */}
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}} />
    </div>
  );
}

