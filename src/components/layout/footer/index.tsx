import { Box, Container, Divider, Stack } from '@mantine/core';
import FooterGrid from './grid';
import FooterGridHero from './grid-hero';
import FooterGridStack from './grid-stack';
import FooterGridStackLink from './grid-stack/link';

const Footer = () => {
  return (
    <>
      <Divider />
      <Stack spacing='md' px='sm' py='xs'>
        <Container size='xl'>
          <FooterGrid>
            <FooterGridHero />
            <FooterGridStack title='Researcher'>
              <FooterGridStackLink
                title='Dashboard'
                href='/research/dashboard'
              />
              <FooterGridStackLink
                title='Apply for Researcher'
                href='/research/apply'
              />
            </FooterGridStack>
            <FooterGridStack title='Support'>
              <FooterGridStackLink title='Contact Us' href='/contact' />
            </FooterGridStack>
            <FooterGridStack title='Terms & Policies'>
              <FooterGridStackLink
                title='Terms of Service'
                href='/terms-of-service'
              />
              <FooterGridStackLink
                title='Privacy Policy'
                href='/privacy-policy'
              />
            </FooterGridStack>
          </FooterGrid>
        </Container>
      </Stack>
    </>
  );
};

export default Footer;
