import React from 'react';
import { Card, Button, Typography, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface SubscriptionPageProps {
  subscriptionStatus?: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing' | 'none';
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  onSubscribe?: () => void;
  onManageBilling?: () => void;
  loading?: boolean;
  stripePaymentLink?: string;
  stripeCustomerId?: string;
  createBillingSession?: () => Promise<string>;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({
  subscriptionStatus = 'none',
  currentPeriodEnd,
  cancelAtPeriodEnd = false,
  onSubscribe,
  onManageBilling,
  loading = false,
  stripePaymentLink,
  stripeCustomerId,
  createBillingSession,
}) => {
  const isStatusActive = subscriptionStatus === 'active' || subscriptionStatus === 'trialing';
  const isPastDue = subscriptionStatus === 'past_due';
  const isExpired = currentPeriodEnd && new Date(currentPeriodEnd) < new Date();
  const showAsActive = isStatusActive && !isExpired;
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={{ 
        maxWidth: 600, 
        margin: '0 auto', 
        padding: '24px',
        textAlign: 'center' 
      }}>
        <div style={{ 
          marginBottom: 24,
          padding: 40, 
          background: '#fafafa', 
          borderRadius: 12 
        }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
          
          <Title level={2} style={{ marginTop: 16, marginBottom: 8 }}>
            Verifying Subscription
          </Title>
          
          <Paragraph type="secondary">
            Please wait while we check your subscription status...
          </Paragraph>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '0 auto', 
      padding: '24px',
      textAlign: 'center' 
    }}>
      <div style={{ 
        marginBottom: 24,
        padding: 40, 
        background: '#fafafa', 
        borderRadius: 12 
      }}>
        {showAsActive ? (
          <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a' }} />
        ) : (
          <CloseCircleOutlined style={{ fontSize: 64, color: '#ff4d4f' }} />
        )}
        
        <Title level={2} style={{ marginTop: 16, marginBottom: 8 }}>
          {showAsActive ? 'Subscription Active' : 'Subscription Required'}
        </Title>
        
        <Paragraph type="secondary">
          {!showAsActive 
            ? 'You need an active subscription to access the admin panel.'
            : isPastDue
              ? 'Your subscription payment is past due. Please update your payment method.'
              : 'Your subscription is active and up to date.'
          }
        </Paragraph>

        {currentPeriodEnd && showAsActive && (
          <Text type="secondary">
            {cancelAtPeriodEnd 
              ? `Your subscription will end on ${formatDate(currentPeriodEnd)}`
              : `Next billing date: ${formatDate(currentPeriodEnd)}`
            }
          </Text>
        )}
      </div>

      <Card>
        <Title level={4}>Subscription Details</Title>
        
        <div style={{ textAlign: 'left', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text strong>Status:</Text>
            <Text style={{ 
              color: showAsActive ? '#52c41a' : '#ff4d4f',
              textTransform: 'capitalize'
            }}>
              {subscriptionStatus === 'none' ? 'Not Subscribed' : subscriptionStatus.replace('_', ' ')}
            </Text>
          </div>
          
          {currentPeriodEnd && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text strong>{cancelAtPeriodEnd ? 'Ends on:' : 'Current period ends:'}</Text>
              <Text>{formatDate(currentPeriodEnd)}</Text>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {!showAsActive && onSubscribe && (
            <Button 
              type="primary" 
              size="large"
              loading={loading}
              onClick={onSubscribe}
              style={{ background: '#E5C100', borderColor: '#E5C100' }}
            >
              Subscribe Now
            </Button>
          )}
          
          {showAsActive && onManageBilling && (
            <Button 
              size="large"
              onClick={onManageBilling}
            >
              Manage Billing
            </Button>
          )}
          
          {isExpired && onSubscribe && (
            <Button 
              type="primary" 
              size="large"
              loading={loading}
              onClick={onSubscribe}
              style={{ background: '#E5C100', borderColor: '#E5C100' }}
            >
              Pay Now
            </Button>
          )}
        </div>
      </Card>

      <Paragraph type="secondary" style={{ marginTop: 24 }}>
        Payment powered by Stripe
      </Paragraph>
    </div>
  );
};

export default SubscriptionPage;
