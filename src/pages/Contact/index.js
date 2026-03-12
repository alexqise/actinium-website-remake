import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import useReveal from '../../hooks/useReveal';

const INITIAL_FORM = { firstName: '', lastName: '', email: '', comments: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [contentRef, contentVisible] = useReveal(0.1);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.comments.trim()) errs.comments = 'Please enter a message';
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with questions, inquiries, or partnership opportunities."
      />

      <ContentSection ref={contentRef}>
        <Container>
          <Grid $visible={contentVisible}>
            <FormCol>
              {submitted ? (
                <SuccessMessage>
                  <SuccessIcon>✓</SuccessIcon>
                  <SuccessTitle>Message Sent</SuccessTitle>
                  <SuccessText>
                    Thank you for reaching out. We'll review your message and get back to you shortly.
                  </SuccessText>
                  <ResetButton onClick={() => setSubmitted(false)}>
                    Send another message
                  </ResetButton>
                </SuccessMessage>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <FormTitle>Send us a message</FormTitle>
                  <FormRow>
                    <FormGroup>
                      <FormLabel>First Name *</FormLabel>
                      <FormInput
                        value={form.firstName}
                        onChange={handleChange('firstName')}
                        placeholder="First name"
                        $error={errors.firstName}
                      />
                      {errors.firstName && <FormError>{errors.firstName}</FormError>}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Last Name *</FormLabel>
                      <FormInput
                        value={form.lastName}
                        onChange={handleChange('lastName')}
                        placeholder="Last name"
                        $error={errors.lastName}
                      />
                      {errors.lastName && <FormError>{errors.lastName}</FormError>}
                    </FormGroup>
                  </FormRow>
                  <FormGroup>
                    <FormLabel>Email *</FormLabel>
                    <FormInput
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="your@email.com"
                      $error={errors.email}
                    />
                    {errors.email && <FormError>{errors.email}</FormError>}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Comments *</FormLabel>
                    <FormTextarea
                      value={form.comments}
                      onChange={handleChange('comments')}
                      placeholder="How can we help you?"
                      rows={5}
                      $error={errors.comments}
                    />
                    {errors.comments && <FormError>{errors.comments}</FormError>}
                  </FormGroup>
                  <SubmitBtn type="submit">Send Message</SubmitBtn>
                </Form>
              )}
            </FormCol>
            <InfoCol>
              <InfoCard>
                <InfoTitle>Actinium Pharmaceuticals, Inc.</InfoTitle>
                <InfoSection>
                  <InfoLabel>Address</InfoLabel>
                  <InfoText>
                    100 Park Avenue, 23rd Floor<br />
                    New York, NY 10017
                  </InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoLabel>Investor Relations</InfoLabel>
                  <InfoAnchor href="mailto:investorrelations@actiniumpharma.com">
                    investorrelations@actiniumpharma.com
                  </InfoAnchor>
                </InfoSection>
                <InfoSection>
                  <InfoLabel>Stock Information</InfoLabel>
                  <InfoText>ATNM — NYSE American</InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoLabel>Online</InfoLabel>
                  <InfoAnchor
                    href="https://www.actiniumpharma.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.actiniumpharma.com
                  </InfoAnchor>
                </InfoSection>
              </InfoCard>
            </InfoCol>
          </Grid>
        </Container>
      </ContentSection>
    </>
  );
}

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const ContentSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 3rem;
  align-items: start;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s ease;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormCol = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const FormLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1.5px solid ${p => p.$error ? '#dc2626' : colors.border};
  border-radius: ${metrics.radius.small};
  font-size: 0.95rem;
  color: ${colors.textPrimary};
  transition: border-color 0.25s ease;

  &:focus { border-color: ${colors.blue}; }
  &::placeholder { color: ${colors.textTertiary}; }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1.5px solid ${p => p.$error ? '#dc2626' : colors.border};
  border-radius: ${metrics.radius.small};
  font-size: 0.95rem;
  color: ${colors.textPrimary};
  transition: border-color 0.25s ease;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus { border-color: ${colors.blue}; }
  &::placeholder { color: ${colors.textTertiary}; }
`;

const FormError = styled.span`
  font-size: 0.78rem;
  color: #dc2626;
  font-weight: 500;
`;

const SubmitBtn = styled.button`
  padding: 0.85rem 2rem;
  background: ${colors.navy};
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: ${metrics.radius.medium};
  transition: background 0.25s ease;
  align-self: flex-start;

  &:hover { background: ${colors.navyLight}; }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.xl};
`;

const SuccessIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #ecfdf5;
  color: #059669;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.25rem;
`;

const SuccessTitle = styled.h3`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.5rem;
`;

const SuccessText = styled.p`
  font-size: 0.95rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto 1.5rem;
`;

const ResetButton = styled.button`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.8; }
`;

const InfoCol = styled.div``;

const InfoCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.xl};
  padding: 2rem;
  position: sticky;
  top: calc(${metrics.navHeight} + 2rem);
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.border};
`;

const InfoSection = styled.div`
  margin-bottom: 1.25rem;

  &:last-child { margin-bottom: 0; }
`;

const InfoLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.textTertiary};
  margin-bottom: 0.3rem;
`;

const InfoText = styled.p`
  font-size: 0.92rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const InfoAnchor = styled.a`
  font-size: 0.92rem;
  color: ${colors.blue};
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.8; }
`;
