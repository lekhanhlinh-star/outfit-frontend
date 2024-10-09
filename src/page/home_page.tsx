import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text, HStack, Button, ButtonGroup, Stack } from '@chakra-ui/react';
import i18n from '../i18n';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga4';

import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
  const { t } = useTranslation();
  const nav = useNavigate();

  useEffect(() => {
    document.title = 'Welcome Page';
    const cookieExists = Cookies.get('user_session_id');
    ReactGA.send({ hitType: 'pageview', page: '/' });
    if (!cookieExists) {
      // Tạo cookie mới với ID duy nhất
      const uniqueId = generateUniqueId();
      Cookies.set('user_session_id', uniqueId, { expires: 365 });
    }
  }, [t]);



  const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const toggleLanguage = (language: 'en' | 'zh') => {
    ReactGA.event({ category: 'Language', action: 'Change Language', label: language });
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  const currentLanguage = i18n.language === 'zh' ? 'zh' : 'en';

  return (
    <Box
      height={['100vh', '100vh', '100vh', '100vh']}
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage="url('/background3.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      flexDirection="column"
      padding={['0', '0', '4', '8']}
      position="relative"
    >
  
      <HStack position="absolute" top="20px" left="20px" color={'white'}>
        <ButtonGroup isAttached>
          <Button
            variant='outline'
            colorScheme='red'
            onClick={() => toggleLanguage('en')}
            bg={currentLanguage === 'en' ? 'blue.700' : 'gray.700'}
            _hover={{ bg: 'blue.600' }}
            color="white"
            borderRightRadius={0}
          >
            English 
          </Button>
          <Button
            variant='outline'
            colorScheme='red'
            onClick={() => toggleLanguage('zh')}
            bg={currentLanguage === 'zh' ? 'blue.500' : 'gray.700'}
            _hover={{ bg: 'blue.400' }}
            color="white"
            borderLeftRadius={0}
          >
            中文
          </Button>
        </ButtonGroup>
      </HStack>

      {/* Văn bản chào mừng */}
      <Stack
        fontSize={['2xl', '3xl', '4xl']}
        fontWeight="bold"
        mb={10}
        textAlign="center"
      >
        <Text as="span" color="red.500" fontFamily="PlaywriteCU-ExtraLight" fontWeight="bold">
          {t('welcome')}
        </Text>{' '}
        <Text as="span" color="green.400" fontFamily="PlaywriteCU-ExtraLight">
          {t('outfitOfTheDay')}
        </Text>
      </Stack>

      <Button
        width={'300px'}
        maxH={'40px'}
        colorScheme="orange"
        borderRadius="full"
        size={['md', 'lg']}
        _hover={{ bg: 'blue.500' }}
        onClick={() => {
    
          nav("/image")
        }}
      >
        {t('start')}
      </Button>
    </Box>
  );
};

export default Home;
