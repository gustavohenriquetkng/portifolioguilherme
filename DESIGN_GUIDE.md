# Guia de Design - Portfólio Galáxia

## 1. Conceito Visual
- **Tema:** Galáxia Profunda (Moderno, Imersivo, Profissional).
- **Estilo:** Glassmorphism (transparências foscas) sobre fundo escuro com elementos espaciais.
- **Referências:** Apple (tipografia e espaçamento), Stripe (gradientes e modernidade), Vercel (minimalismo e performance).

## 2. Paleta de Cores
- **Fundo Principal:** Imagem de galáxia com overlay escuro (`rgba(10, 10, 15, 0.85)`).
- **Primária (Destaque):** `#7c4dff` (Roxo Espacial) a `#00d4ff` (Azul Neon) - Gradiente.
- **Texto Principal:** `#ffffff` (Branco puro para títulos).
- **Texto Secundário:** `rgba(255, 255, 255, 0.7)` (Cinza claro para parágrafos).
- **Glassmorphism:** `rgba(255, 255, 255, 0.05)` com `backdrop-filter: blur(12px)`.

## 3. Tipografia
- **Títulos:** 'Inter', sans-serif (Peso 700-800) - Moderna e limpa.
- **Corpo:** 'Inter', sans-serif (Peso 400-500).
- **Fallback:** System UI fonts.

## 4. Estrutura de Seções
1. **Hero:** Título impactante, subtítulo, CTA e efeito parallax inicial.
2. **Sobre:** Texto pessoal com cards de informações rápidas em estilo glass.
3. **Experiência:** Timeline vertical moderna com pontos de luz.
4. **Habilidades:** Grid de cards com ícones e barras de progresso estilizadas.
5. **Projetos:** Cards com efeito hover de zoom e overlays de informações.
6. **Contato:** Formulário/Links de contato em container glassmorphism centralizado.
7. **Footer:** Simples, com links sociais e copyright.

## 5. Animações e Interatividade
- **Scroll Reveal:** Seções surgem com fade-in e slide-up suave.
- **Parallax:** O fundo de galáxia move-se mais devagar que o conteúdo.
- **Hover Effects:** Cards aumentam levemente de tamanho e brilham.
- **Navbar:** Fixa no topo, muda de transparência total para glassmorphism ao rolar.
