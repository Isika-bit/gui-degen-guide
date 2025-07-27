import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Crown, Zap, Star, Sparkles, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import guiToken from '@/assets/gui-token.png';

interface PaymentFlowProps {
  onSubscriptionComplete: () => void;
  onClose: () => void;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  degen?: boolean;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({ onSubscriptionComplete, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [loading, setLoading] = useState(false);
  const [guiBalance] = useState(15420.69);

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 50,
      duration: 'month',
      icon: <Star className="w-5 h-5" />,
      features: [
        'AI-powered DeFi recommendations',
        'Basic market alerts',
        'Portfolio tracking',
        'Risk assessment tools',
        'Community access'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 150,
      duration: 'month',
      icon: <Crown className="w-5 h-5" />,
      popular: true,
      features: [
        'Everything in Basic',
        'Real-time premium alerts',
        'Auto-execution of trades',
        'Advanced analytics',
        'Priority customer support',
        'Whale movement tracking',
        'Arbitrage opportunities'
      ]
    },
    {
      id: 'degen',
      name: 'Degen',
      price: 420,
      duration: 'month',
      icon: <Rocket className="w-5 h-5" />,
      degen: true,
      features: [
        'Everything in Pro',
        '🚀 Degen mode unlock',
        'Experimental strategies',
        'Meme token opportunities',
        'Flash loan strategies',
        'Diamond hands challenges',
        'Exclusive degen community',
        'Custom AI training'
      ]
    }
  ];

  const handlePayment = async () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    if (guiBalance < plan.price) {
      toast.error("Insufficient $GUI balance!", {
        description: `You need ${plan.price} $GUI but only have ${guiBalance.toFixed(2)}`
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate payment processing on Aptos blockchain
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success(`🎉 ${plan.name} subscription activated!`, {
        description: `Paid ${plan.price} $GUI for premium features`
      });
      
      onSubscriptionComplete();
    } catch (error) {
      toast.error("Payment failed", {
        description: "Please try again or contact support"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gui mb-2">
          Unlock Premium Features
        </h2>
        <p className="text-muted-foreground">
          Pay with $GUI to access exclusive AI-powered DeFi tools
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedPlan === plan.id 
                ? plan.degen 
                  ? 'border-space-purple shadow-glow gradient-degen text-white' 
                  : plan.popular 
                    ? 'border-gui-orange shadow-gui' 
                    : 'border-primary'
                : 'hover:border-muted-foreground'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {plan.icon}
                <CardTitle className={selectedPlan === plan.id && plan.degen ? 'text-white' : ''}>
                  {plan.name}
                </CardTitle>
                {plan.popular && (
                  <Badge className="gradient-gui text-white">Most Popular</Badge>
                )}
                {plan.degen && (
                  <Badge className="gradient-degen text-white">🚀 DEGEN</Badge>
                )}
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <img src={guiToken} alt="$GUI" className="w-8 h-8" />
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className={`text-sm ${selectedPlan === plan.id && plan.degen ? 'text-white/70' : 'text-muted-foreground'}`}>
                  $GUI/{plan.duration}
                </span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                      selectedPlan === plan.id && plan.degen 
                        ? 'text-white' 
                        : 'text-defi-green'
                    }`} />
                    <span className={`text-sm ${
                      selectedPlan === plan.id && plan.degen 
                        ? 'text-white/90' 
                        : 'text-muted-foreground'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Summary */}
      {selectedPlanData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gui-orange" />
              <span>Payment Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{selectedPlanData.name} Plan</span>
              <div className="flex items-center space-x-2">
                <img src={guiToken} alt="$GUI" className="w-5 h-5" />
                <span className="font-semibold">{selectedPlanData.price}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <span>Platform Fee</span>
              <div className="flex items-center space-x-2">
                <img src={guiToken} alt="$GUI" className="w-5 h-5" />
                <span className="font-semibold">0</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <div className="flex items-center space-x-2">
                <img src={guiToken} alt="$GUI" className="w-6 h-6" />
                <span>{selectedPlanData.price}</span>
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your $GUI Balance:</span>
                <div className="flex items-center space-x-1">
                  <img src={guiToken} alt="$GUI" className="w-4 h-4" />
                  <span className="font-medium">{guiBalance.toFixed(2)}</span>
                </div>
              </div>
              
              {guiBalance < selectedPlanData.price && (
                <div className="mt-2 text-sm text-defi-red">
                  ⚠️ Insufficient balance. Need {selectedPlanData.price - guiBalance} more $GUI
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-gui-orange rounded-lg bg-gui-orange/10">
            <div className="flex items-center space-x-3">
              <img src={guiToken} alt="$GUI Token" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">$GUI Token</h3>
                <p className="text-sm text-muted-foreground">
                  Pay with $GUI on Aptos blockchain - Zero gas fees!
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-inu-blue/10 border border-inu-blue rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="w-4 h-4 text-inu-blue" />
              <span>Instant activation • Secure payments • Low fees</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button 
          variant={selectedPlanData?.degen ? "degen" : "gui"}
          onClick={handlePayment}
          disabled={loading || (selectedPlanData && guiBalance < selectedPlanData.price)}
          className="flex-1"
        >
          {loading ? (
            "Processing..."
          ) : selectedPlanData?.degen ? (
            <>
              <Rocket className="w-4 h-4" />
              SEND IT! 🚀
            </>
          ) : (
            <>
              <Crown className="w-4 h-4" />
              Subscribe Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};