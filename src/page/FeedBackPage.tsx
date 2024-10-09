import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Image,
    Text,
    Stack,
    useToast,
    Select,
    Tooltip,
    Grid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, ArrowBackIcon } from '@chakra-ui/icons'; // Importing necessary icons
import { FcLike } from "react-icons/fc"; // Existing icon for all feedback options
import ReactGA from 'react-ga4';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const SelectOptionPage: React.FC = () => {
    const { t } = useTranslation(); // Initialize useTranslation
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [occasion, setOccasion] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        document.title = "Select Option Page" // Use translation for title
        const storedImage = localStorage.getItem('selectedImages');
        if (storedImage) {
            setSelectedImage(storedImage);
        }
        ReactGA.send({ hitType: 'pageview', page: '/selectOptions' });
        var language = localStorage.getItem('i18nextLng');
        if (language) {
            setLanguage(language);
        }
    }, [t]);

    const handleFeedbackOption = (option: string) => {
        setSelectedOption(option);
    };

    const getIconForOption = (option: string) => {
        switch (option) {
            case 'fashionista_gentle':
                return <span role="img" aria-label="Dress">👗</span>; // Dress icon
            case 'fashionista_strict':
                return <span role="img" aria-label="High Heel">👠</span>; // High heel icon
            case 'bestie_gentle':
                return <span role="img" aria-label="Heart">💖</span>; // Heart icon
            case 'bestie_strict':
                return <span role="img" aria-label="Warning">⚠️</span>; // Warning icon
            default:
                return <FcLike />;
        }
    };

    const handleSubmitFeedback = async () => {
        ReactGA.event({ category: 'Feedback', action: 'Submit Button Clicked' });
        if (!selectedImage || !selectedOption || !occasion) {
            toast({
                title: t('warning'), // Use translation for warning
                description: t('please_select_image_option_occasion'), // Example key, define in translations
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        const dataURItoBlob = (dataURI: string) => {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        };

        const imageBlob = dataURItoBlob(selectedImage);
        const formData = new FormData();
        formData.append('file', imageBlob, 'selected_image.jpg');
        formData.append('style', selectedOption);
        formData.append('language', language);
        formData.append('occasion', occasion);

        ReactGA.event({ category: 'Feedback', action: 'Feedback Submitted' });
        setLoading(true);

        try {
            const response = await fetch('https://outfit-mirror-v1.onrender.com/feedback/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            navigate('/feedback', {
                state: {
                    feedback: data.feedback,
                    audio_url: data.audio_url,
                },
            });


        } catch (error: any) {
            toast({
                title: t('submission_error'), // Use translation for submission error
                description: `There was an error submitting your feedback: ${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        ReactGA.event({ category: 'Feedback', action: 'Back Button Clicked' });
        navigate('/image');
    };

    return (
        <Box
            width={'100%'}
            backgroundImage="url('/background3.jpg')"
            backgroundSize="cover"
            backgroundPosition="center">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={4}
                width={{ base: '100%', sm: '90%', md: '80%', lg: '60%' }}
                maxWidth="600px"

                mx="auto"
                borderRadius="md"
                boxShadow="md"
                backgroundColor={'gray.100'}

            >
                <Stack spacing={4} justifyContent="center" alignItems="center" width="100%">
                    <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold" my="4" color="teal.600">
                        {t('please_choose')} {/* Use translation for text */}
                    </Text>

                    {selectedImage ? (
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
                    ) : (
                        <Text color="red.500">{t('no_image_selected')}</Text> // Example translation key
                    )}

                    <Grid templateColumns="repeat(1, 1fr)" gap={4} width="100%">
                        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb="4" color="teal.600">
                            {t('select_occasion')} {/* Use translation for occasion selection */}
                        </Text>

                        <Tooltip label={t('select_occasion')} aria-label="Occasion selection tooltip">
                            <Select
                                placeholder={t('select_occasion')}
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                                mb={4}
                                width="100%"
                            >
                                <option value={t('wedding')}>{t('wedding')}</option>
                                <option value={t('dating')}>{t('dating')}</option>
                                <option value={t('outing')}>{t('outing')}</option>
                            </Select>
                        </Tooltip>

                        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb="4" color="teal.600">
                            {t('select_feedback_style')} {/* Use translation for feedback style selection */}
                        </Text>

                        {['bestie_gentle', 'bestie_strict', 'fashionista_gentle', 'fashionista_strict'].map((option, index) => (
                            <Button
                                key={index}
                                colorScheme={"blue"}
                                onClick={() => handleFeedbackOption(option)}
                                width="full"
                                size="lg"
                                variant={selectedOption === option ? 'solid' : 'outline'}
                                leftIcon={getIconForOption(option)} // Updated to use the icon mapping function
                            >
                                {t(option)}
                            </Button>
                        ))}
                    </Grid>

                    <Button
                        colorScheme="purple"
                        onClick={handleSubmitFeedback}
                        mt="4"
                        width="full"
                        size="lg"
                        isLoading={loading}
                        loadingText="Submitting"
                        leftIcon={<CheckIcon />} // Keep the CheckIcon for submission
                    >
                        {t('submit_feedback')} {/* Example translation key */}
                    </Button>

                    <Button colorScheme="teal" onClick={handleBack} mt="4" width="full" size="lg" leftIcon={<ArrowBackIcon />}>
                        {t('back_to_image')} {/* Use translation for back button */}
                    </Button>

                    {/* Audio Player */}
                    {audioUrl && (
                        <Box mt="4" width="100%">
                            <Text fontSize="lg" fontWeight="bold" mb="2" color="teal.600">
                                {t('feedback_audio')} {/* Use translation for feedback audio */}
                            </Text>
                            <audio controls src={`https://outfit-mirror-v1.onrender.com${audioUrl}`} style={{ width: '100%' }} autoPlay>
                                Your browser does not support the audio element.
                            </audio>
                            <Text mt="2" color="gray.600">{feedbackMessage}</Text>
                        </Box>
                    )}
                </Stack>
            </Box>
        </Box>

    );
};

export default SelectOptionPage;
