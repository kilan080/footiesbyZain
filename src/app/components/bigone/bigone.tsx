'use client';
import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Image from 'next/image';
import Fade from '@mui/material/Fade'

interface ImageSliderProps {
  images?: string[];
  autoPlayInterval?: number;
}

const FullScreenSlider: React.FC<ImageSliderProps> = ({ 
  images = ['/IMG-20251008-WA0006.jpg', '/IMG-20251008-WA0007.jpg', '/IMG-20251008-WA0010.jpg'],
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideContent = [
    {
      title: 'Step Into Comfort',
      subtitle: 'Experience the perfect blend of style and coziness with our exclusive collection.',
    },
    {
      title: 'Quality You Can Feel',
      subtitle: 'Price you can trust.',
    },
    {
      title: 'Style Meets Function',
      subtitle: 'Perfect for work, play and everything in between, our versatile designs fit your lifestyle.',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '50vh', sm: '60vh', md: '70vh' },
        overflow: 'hidden',
      }}
    >
      {/* Image Box */}
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
          transition: 'transform 0.8s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              minWidth: `${100 / images.length}%`,
              height: '100%',
              position: 'relative',
            }}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              quality={95}
              priority={index === 0}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          zIndex: 10,
          width: { xs: '90%', sm: '80%', md: '60%' },
        }}
      >
        <Fade in={true} timeout={1200}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              mb: 2,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {slideContent[currentIndex].title}
          </Typography>
          </Fade>
        <Fade in={true} timeout={1200}>
          <Typography
            variant='h5'
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {slideContent[currentIndex].subtitle}
          </Typography>
        </Fade>
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={goToPrevious}
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: '10px', md: '30px' },
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
          zIndex: 10,
        }}
      >
        <ChevronLeft sx={{ fontSize: 30 }} />
      </IconButton>

      <IconButton
        onClick={goToNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '10px', md: '30px' },
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
          zIndex: 10,
        }}
      >
        <ChevronRight sx={{ fontSize: 30 }} />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '20px', md: '40px' },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 10,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: { xs: '10px', md: '12px' },
              height: { xs: '10px', md: '12px' },
              borderRadius: '50%',
              backgroundColor: currentIndex === index 
                ? 'white' 
                : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FullScreenSlider;