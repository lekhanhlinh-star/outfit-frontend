import React, { useEffect, useState } from 'react';
import { Box, Text, Stack, Button, Image } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';

interface ResultPageProps {
    feedback: string;
    audio_url: string;
}

const ResultPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to access state
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { t } = useTranslation();
    // Destructure feedback and audio_url from location.state
    const { feedback, audio_url } = location.state as ResultPageProps;
    useEffect(() => {
        document.title = "Feedback Page" // Use translation for title
        const storedImage = localStorage.getItem('selectedImages');
        if (storedImage) {
            setSelectedImage(storedImage);
        } 
    },[])
    const handleBack = () => {
        navigate('/image');
    };

    return (
        <Box
        width={'100%'}       
        backgroundImage="url('/background3.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        >
      <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="gray.50"
            p={4}
            width={{ base: '100%', sm: '90%', md: '80%', lg: '60%' }}
            maxWidth="600px"
            mx="auto"
            borderRadius="md"
            boxShadow="md"
        >
            <Stack spacing={4} justifyContent="center" alignItems="center" width="100%">
                <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold" my="4" color="teal.600">
                    {t("feedback_results")}
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


                <Text color="teal.600">{feedback}</Text>

                {/* Audio Player */}
                {audio_url && (
                    <Box mt="4" width="100%">
                        <Text fontSize="lg" fontWeight="bold" mb="2" color="teal.600">
                            {t("feedback_audio")}
                        </Text>
                        <audio controls src={"https://outfit-mirror-v1.onrender.com"+audio_url} style={{ width: '100%' }} autoPlay>
                            Your browser does not support the audio element.
                        </audio>
                    </Box>
                )}
                <Button colorScheme="red" onClick={() => {
                    navigate('/reviewPhoto');
                }} mt="4" width="full" size="lg">
                    {t("back")}
                </Button>
                <Button colorScheme="teal" onClick={handleBack} mt="4" width="full" size="lg">
                    {t("back_to_image")}
                </Button>
            </Stack>
        </Box>
        </Box>
  
    );
};

export default ResultPage;
