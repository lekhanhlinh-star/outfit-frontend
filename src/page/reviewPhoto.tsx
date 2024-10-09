import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Image, Text, useToast, Stack, Divider } from '@chakra-ui/react';
import ReactGA from 'react-ga4'; // Import GA4
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ReviewPhotoPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const { t } = useTranslation();
    const nav = useNavigate();
    const handleRetry = () => {
        setSelectedImage(null);
        setIsCameraActive(false); // Stop camera if it was active
        localStorage.removeItem('selectedImages'); // Clear the localStorage

        // Log to GA4
        ReactGA.event({
            category: 'Image',
            action: 'Retry Image Selection',
        });
        navigate('/image');
    };

    // Confirm function to handle the confirmed image
    const handleConfirm = () => {
        // Log to GA4
        ReactGA.event({
            category: 'Image',
            action: 'Image Confirmed',
        });
        navigate('/selectOptions');
    };
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Review Photo Page";
        ReactGA.send({ hitType: 'pageview', page: '/reviewPhoto' });

        const storedImage = localStorage.getItem('selectedImages');
        if (storedImage) {
            setSelectedImage(storedImage);
        }

    },[])
    return (
        <Box 
        backgroundImage="url('/background3.jpg')"
        backgroundSize="cover"
        backgroundPosition="center">
      <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="8"
            width={{ base: '100%', sm: '90%', md: '80%', lg: '60%' }}
            maxWidth="600px"
              mx="auto"
              backgroundColor={"gray.50"}
       
        >
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb="4" color="orange.500">
                {t("review_your_photo")}
            </Text>
           {selectedImage && (
                    <Box
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        bg="white"
                        p={4}
                    >
                        <Image
                            src={selectedImage}
                            alt="Selected or Captured"
                            boxSize="100%"
                            objectFit="cover"
                            borderRadius="md"
                        />
                    </Box>
                )}

                {/* Buttons for retrying and confirming, always visible when an image is selected */}
                {selectedImage && (
                    <>
                        <Button colorScheme="red" onClick={handleRetry} mt="4" minH={"40px"} width="full" aria-label="Retry" maxW={'800px'}>
                            {t("retry")}
                        </Button>
                        <Button colorScheme="green" onClick={handleConfirm} mt="2" minH={"40px"} width="full" aria-label="Confirm" maxW={'800px'}>
                            {t("confirm")}
                        </Button>
                    </>
                )}
        </Box>
        </Box>
  
    );
};

export default ReviewPhotoPage;
