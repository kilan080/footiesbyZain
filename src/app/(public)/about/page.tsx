import React from 'react'
import { Box, Typography } from '@mui/material'

const About = () => {
  return (
    <Box sx={{ background: '#fff', color: '#111', overflow: 'hidden', minHeight: '100vh', fontFamily: 'var(--font-vollkorn)' }}>

      {/* 2 BIG IMAGES */}
      <Box sx={{ height: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, position: 'relative' }}>

        {/* Image 1 */}
        <Box sx={{ overflow: 'hidden', position: 'relative' }}>
          <Box
            component="img"
            src="https://i5.walmartimages.com/asr/204670bc-d02c-4745-8f5a-fa5e6ef21437.bc2d701327e865fd0f600c783c377208.jpeg"
            alt="Footies handmade shoe"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.04)', transition: 'transform 8s ease', '&:hover': { transform: 'scale(1)' } }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.25)' }} />
        </Box>

        {/* Image 2 */}
        <Box sx={{ overflow: 'hidden', position: 'relative', display: { xs: 'none', md: 'block' } }}>
          <Box
            component="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3kuObhIC18wSRFy3quY90rJl6bkhkVb2vCg&s"
            alt="Footies slide"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.04)', transition: 'transform 8s ease', '&:hover': { transform: 'scale(1)' } }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.25)' }} />
        </Box>

        {/* Overlay Text */}
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 3 }}>
          <Typography sx={{ fontFamily: 'var(--font-vollkorn)', fontSize: '10px', letterSpacing: '7px', textTransform: 'uppercase', color: '#111', mb: 2, animation: 'rise 1s ease 0.4s both' }}>
            Handmade Shoes & Slides
          </Typography>
          <Typography component="h1" sx={{ fontFamily: 'var(--font-vollkorn)', fontSize: 'clamp(50px, 9vw, 120px)', fontWeight: 900, lineHeight: 0.9, color: '#111', animation: 'rise 1s ease 0.7s both' }}>
            Footies
            <Box component="span" sx={{ display: 'block', fontStyle: 'italic', fontWeight: 400, color: '#555', fontSize: '0.6em' }}>
              by Zain
            </Box>
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-vollkorn)', mt: 3, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', animation: 'rise 1s ease 1s both' }}>
            For Him · For Her · Made with Love
          </Typography>
        </Box>
      </Box>

      {/* STORY */}
      <Box sx={{ maxWidth: '760px', mx: 'auto', py: { xs: 10, md: 16 }, px: 4, textAlign: 'center' }}>

        <Typography sx={{ fontFamily: 'var(--font-vollkorn)', fontSize: '10px', letterSpacing: '6px', textTransform: 'uppercase', color: '#888', mb: 2.5 }}>
          Our Story
        </Typography>

        <Typography component="blockquote" sx={{ fontFamily: 'var(--font-vollkorn)', fontSize: 'clamp(22px, 3.5vw, 36px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5, color: '#111', mb: 5 }}>
          Each pair was crafted to carry culture, comfort, and quality &mdash; across borders and beyond.
        </Typography>

        <Box sx={{ width: '50px', height: '2px', background: '#111', mx: 'auto', mb: 5 }} />

        <Typography sx={{ fontFamily: 'var(--font-vollkorn)', fontSize: '15px', lineHeight: 1.95, color: '#444', fontWeight: 400 }}>
           In 2019, FootiesByZain was founded by Zain, a visionary designer with a
            passion for luxury footwear. Inspired by the flair for street fashion,
            Zain set out to create a brand that would redefine elegance and set new
            standards of unmatched quality.   
        </Typography>
        <Typography sx={{ fontFamily: 'var(--font-vollkorn)', fontSize: '15px', lineHeight: 1.95, color: '#444', fontWeight: 400, mt: 2.5 }}>
          Every handmade shoe and slide — crafted for men and women — is designed with love and true devotedness. No shortcuts, no compromises. Just quality you can feel from the very first step.
        </Typography>
        <Typography sx={{ fontFamily: 'var(--font-vollkorn)', fontSize: '15px', lineHeight: 1.95, color: '#444', fontWeight: 400, mt: 2.5 }}>
           FootiesByZain isn&apos;t just footwear. It&apos;s a statement. Built to
            proselytize street fashion across borders and beyond — for those who wear
            their story without apology.
        </Typography>

        <Typography sx={{ fontFamily: 'var(--font-vollkorn)', mt: 5, fontStyle: 'italic', fontSize: '17px', color: '#888' }}>
          — Zain, Founder of FootiesByZain
        </Typography>
      </Box>

      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </Box>
  )
}

export default About