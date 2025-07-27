import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Zap, Target, Brain, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import guiInuMascot from '@/assets/gui-inu-mascot.png';
import guiToken from '@/assets/gui-token.png';
import degenMode from '@/assets/degen-mode.png';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  apy: number;
  risk: 'Low' | 'Medium' | 'High' | 'Degen';
  protocol: string;
  tvl: string;
  guiRequired: number;
  isDegen?: boolean;
}

interface DashboardProps {
  degenModeEnabled: boolean;
  onDegenModeToggle: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ degenModeEnabled, onDegenModeToggle }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [guiBalance] = useState(15420.69); // Mock balance

  useEffect(() => {
    // Simulate AI generating recommendations
    const generateRecommendations = () => {
      const baseRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'Echelon Market $GUI Staking',
          description: 'Stake your $GUI tokens for steady rewards with Aptos native security',
          apy: 12.5,
          risk: 'Low',
          protocol: 'Echelon Market',
          tvl: '$2.4M',
          guiRequired: 100
        },
        {
          id: '2',
          title: 'Aptos-USDC LP on PancakeSwap',
          description: 'Provide liquidity for stable returns with impermanent loss protection',
          apy: 18.3,
          risk: 'Medium',
          protocol: 'PancakeSwap',
          tvl: '$12.8M',
          guiRequired: 250
        },
        {
          id: '3',
          title: 'GUI-APT Yield Farm',
          description: 'Farm high-yield rewards by pairing $GUI with native Aptos token',
          apy: 45.7,
          risk: 'High',
          protocol: 'Liquidswap',
          tvl: '$850K',
          guiRequired: 500
        }
      ];

      const degenRecommendations: Recommendation[] = [
        {
          id: '4',
          title: '🚀 MOONSHOT PROTOCOL',
          description: 'YOLO into the next 1000x gem before it explodes! Not financial advice... but maybe it is? 😏',
          apy: 420.69,
          risk: 'Degen',
          protocol: 'DegenFi',
          tvl: '$69K',
          guiRequired: 1000,
          isDegen: true
        },
        {
          id: '5',
          title: '💎 Diamond Hands Vault',
          description: 'Lock your $GUI for 69 days and become a certified diamond hands holder!',
          apy: 133.7,
          risk: 'Degen',
          protocol: 'HODL Protocol',
          tvl: '$420K',
          guiRequired: 2000,
          isDegen: true
        }
      ];

      return degenModeEnabled 
        ? [...baseRecommendations, ...degenRecommendations]
        : baseRecommendations;
    };

    setTimeout(() => {
      setRecommendations(generateRecommendations());
      setLoading(false);
      toast("🤖 AI Mentor analyzed market conditions!", {
        description: `Found ${degenModeEnabled ? 5 : 3} opportunities for you!`
      });
    }, 1500);
  }, [degenModeEnabled]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-defi-green text-white';
      case 'Medium': return 'bg-doge-yellow text-black';
      case 'High': return 'bg-defi-red text-white';
      case 'Degen': return 'gradient-degen text-white';
      default: return 'bg-muted';
    }
  };

  const handleStakeClick = (rec: Recommendation) => {
    if (guiBalance < rec.guiRequired) {
      toast.error("Insufficient $GUI balance!", {
        description: `You need ${rec.guiRequired} $GUI but only have ${guiBalance.toFixed(2)}`
      });
      return;
    }

    toast.success(`🎉 Initiated ${rec.title}!`, {
      description: `Staking ${rec.guiRequired} $GUI for ${rec.apy}% APY`
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-float">
          <img src={guiInuMascot} alt="GUI INU" className="w-32 h-32" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gui">AI is analyzing markets...</h3>
          <p className="text-muted-foreground">Finding the best opportunities for you!</p>
        </div>
        <Progress value={85} className="w-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-gui text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <img src={guiToken} alt="$GUI" className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">$GUI Balance</p>
                <p className="text-2xl font-bold">{guiBalance.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-defi-green" />
              <div>
                <p className="text-sm text-muted-foreground">Portfolio APY</p>
                <p className="text-2xl font-bold text-defi-green">+24.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-inu-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Active Positions</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-space-purple" />
              <div>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold text-space-purple">94%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Degen Mode Toggle */}
      <Card className={degenModeEnabled ? 'gradient-degen text-white' : ''}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={degenMode} 
                alt="Degen Mode" 
                className={`w-16 h-16 ${degenModeEnabled ? 'animate-wiggle' : ''}`} 
              />
              <div>
                <h3 className="text-xl font-bold">Degen Mode</h3>
                <p className={degenModeEnabled ? 'text-white/90' : 'text-muted-foreground'}>
                  {degenModeEnabled 
                    ? "🚀 ACTIVATED! Showing high-risk, high-reward opportunities!" 
                    : "Enable for ultra-high-yield degen plays (not financial advice!)"}
                </p>
              </div>
            </div>
            <Button 
              variant={degenModeEnabled ? "secondary" : "degen"}
              size="lg"
              onClick={onDegenModeToggle}
              className="min-w-[120px]"
            >
              {degenModeEnabled ? "Disable" : "🚀 ACTIVATE"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-6 h-6 text-gui-orange" />
          <h2 className="text-2xl font-bold text-gui">AI-Powered Recommendations</h2>
          {degenModeEnabled && <Badge variant="secondary" className="gradient-degen text-white">DEGEN MODE</Badge>}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className={`hover:shadow-lg transition-all duration-300 ${rec.isDegen ? 'border-space-purple shadow-glow' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className={rec.isDegen ? 'text-degen' : 'text-gui'}>
                      {rec.title}
                    </CardTitle>
                    <Badge className={getRiskColor(rec.risk)}>
                      {rec.risk} Risk
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-defi-green">{rec.apy}%</p>
                    <p className="text-sm text-muted-foreground">APY</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{rec.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Protocol:</span>
                    <span className="font-medium">{rec.protocol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">TVL:</span>
                    <span className="font-medium">{rec.tvl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Required $GUI:</span>
                    <span className="font-medium">{rec.guiRequired}</span>
                  </div>
                </div>

                <Button 
                  variant={rec.isDegen ? "degen" : "defi"}
                  className="w-full"
                  onClick={() => handleStakeClick(rec)}
                >
                  {rec.isDegen ? "🚀 SEND IT!" : "Stake Now"}
                  <Zap className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};