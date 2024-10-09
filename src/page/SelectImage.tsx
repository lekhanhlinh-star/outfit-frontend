import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Image, Text, useToast, Stack, Divider } from '@chakra-ui/react';
import ReactGA from 'react-ga4'; // Import GA4
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SelectImage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for hidden file input
    const toast = useToast();
    const { t } = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Choose Image Page";

        // Load image from localStorage if it exists
        const storedImage = localStorage.getItem('selectedImages');
        if (storedImage) {
            setSelectedImage(storedImage);
        }

        // Cleanup function to stop the camera if it was active
        return () => {
            if (isCameraActive) {
                stopCamera();
            }
        };
    }, [isCameraActive]);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
            if (!validTypes.includes(file.type)) {
                toast({
                    title: "Invalid File Type",
                    description: "Please select an image file (JPEG, PNG, GIF, Webp).",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result as string;
                setSelectedImage(image);
                localStorage.setItem('selectedImages', image);
                navigate("/reviewPhoto")

                // Log to GA4
                ReactGA.event({
                    category: 'Image',
                    action: 'File Selected',
                    label: file.name,
                });

            
            };
            reader.readAsDataURL(file);
        }
    };

    // Programmatically trigger file input
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // Start the camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsCameraActive(true);
            }

            // Log to GA4
            ReactGA.event({
                category: 'Camera',
                action: 'Camera Started',
            });
        } catch (error: any) {
            console.error("Error accessing camera:", error);
            toast({
                title: "Camera Error",
                description: "Unable to access the camera.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });

            // Log error to GA4
            ReactGA.event({
                category: 'Camera',
                action: 'Camera Error',
                label: error.message,
            });
        }
    };

    // Capture the image from the camera
    const handleCameraCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Set canvas dimensions
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            // Draw the video frame to the canvas
            context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL('image/png');
            setSelectedImage(imageUrl);
            localStorage.setItem('selectedImages', imageUrl); // Store the image in localStorage
            stopCamera();
            toast({
                title: "Image Captured",
                description: "You have captured an image.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Log to GA4
            ReactGA.event({
                category: 'Camera',
                action: 'Image Captured',
            });
        }
    };

    // Stop the camera
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraActive(false);

            // Log to GA4
            ReactGA.event({
                category: 'Camera',
                action: 'Camera Stopped',
            });
        }
    };

    // Confirm function to handle the confirmed image
    const handleConfirm = () => {
        // Log to GA4
        ReactGA.event({
            category: 'Image',
            action: 'Image Confirmed',
        });
        navigate('/feedback');
    };

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="8"
            backgroundImage={`url('/background3.jpg')`}
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb="4" color="orange.500">
                {t("title_select_Image")}
            </Text>

            <Stack spacing={4} width={{ base: "90%", sm: "70%", md: "50%", lg: "40%" }} maxWidth="400px">
                <Button
                    colorScheme="teal"
                    onClick={triggerFileInput}
                    variant="solid"
                    size="lg"
                    boxShadow="lg"
                    _hover={{ bg: 'teal.400' }}
                    aria-label="Select Image from device"
                >
                    {t("select_Image")}
               
                </Button>
                
                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    aria-label="Hidden file input"
                />

                {/* Button to activate the camera */}
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        if (!isCameraActive) {
                            startCamera(); // Start the camera when inactive
                        } else {
                            stopCamera();  // Stop the camera when it's already active
                        }
                        setIsCameraActive(!isCameraActive); // Toggle the state after the action
                    }}
                    variant="solid"
                    size="lg"
                    boxShadow="lg"
                    _hover={{ bg: 'blue.400' }}
                    aria-label={isCameraActive ? t("stop_camera") : t("take_new_photo")}
                >
                    {isCameraActive ? t("stop_camera") : t("take_new_photo")}
                </Button>

                {/* Camera Preview */}
                {isCameraActive && (
                    <Box mb="4">
                        <video
                            ref={videoRef}
                            width="100%"
                            autoPlay
                            playsInline
                            style={{ borderRadius: '8px', boxShadow: 'md' }}
                            aria-label="Camera preview"
                        />
                        <Button
                            colorScheme="green"
                            onClick={handleCameraCapture}
                            mt="2"
                            width="full"
                            aria-label="Capture image from camera"
                        >
                            Capture
                        </Button>
                    </Box>
                )}

           


             
            </Stack>
        </Box>
    );
};

export default SelectImage;
