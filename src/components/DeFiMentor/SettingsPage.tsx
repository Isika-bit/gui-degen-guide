import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Target, 
  Shield, 
  Zap, 
  Brain, 
  Rocket,
  AlertTriangle,
  TrendingUp,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import guiInuMascot from '@/assets/gui-inu-mascot.png';
import degenMode from '@/assets/degen-mode.png';

interface SettingsPageProps {
  degenModeEnabled: boolean;
  onDegenModeToggle: () => void;
  riskProfile: string;
  onRiskProfileChange: (profile: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  degenModeEnabled,
  onDegenModeToggle,
  riskProfile,
  onRiskProfileChange
}) => {
  const [riskTolerance, setRiskTolerance] = useState([30]);
  const [investmentGoals, setInvestmentGoals] = useState('');
  const [autoExecute, setAutoExecute] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [portfolioSize, setPortfolioSize] = useState('medium');
  const [timeHorizon, setTimeHorizon] = useState('long');

  const handleSaveSettings = () => {
    const settings = {
      riskTolerance: riskTolerance[0],
      riskProfile,
      investmentGoals,
      autoExecute,
      alertsEnabled,
      portfolioSize,
      timeHorizon,
      degenModeEnabled
    };

    // Simulate saving to blockchain/database
    toast.success("⚙️ Settings saved successfully!", {
      description: "Your AI mentor has been updated with your preferences"
    });
    
    console.log('Saved settings:', settings);
  };

  const getRiskProfileDescription = (profile: string) => {
    switch (profile) {
      case 'conservative':
        return 'Focus on stable, low-risk investments with steady returns';
      case 'balanced':
        return 'Mix of stable and growth investments for moderate returns';
      case 'aggressive':
        return 'High-growth potential with increased risk tolerance';
      case 'degen':
        return '🚀 YOLO mode: Maximum risk for maximum potential gains!';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="animate-float">
              <img src={guiInuMascot} alt="GUI INU" className="w-16 h-16" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gui">AI Mentor Settings</CardTitle>
              <p className="text-muted-foreground">
                Customize your DeFi journey and teach the AI your preferences
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-defi-green" />
              <span>Risk Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={riskProfile} onValueChange={onRiskProfileChange}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative" className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>Conservative</span>
                      <Badge className="bg-defi-green text-white">Low Risk</Badge>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced" className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>Balanced</span>
                      <Badge className="bg-doge-yellow text-black">Medium Risk</Badge>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive" className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>Aggressive</span>
                      <Badge className="bg-defi-red text-white">High Risk</Badge>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="degen" id="degen" />
                  <Label htmlFor="degen" className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>Degen 🚀</span>
                      <Badge className="gradient-degen text-white">MAXIMUM RISK</Badge>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                {getRiskProfileDescription(riskProfile)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Investment Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-inu-blue" />
              <span>Investment Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="goals">Tell the AI about your goals</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Save for a house, retire early, build wealth for the family..."
                value={investmentGoals}
                onChange={(e) => setInvestmentGoals(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label>Portfolio Size</Label>
              <RadioGroup value={portfolioSize} onValueChange={setPortfolioSize} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small (&lt; $1K)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium ($1K - $10K)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large (&gt; $10K)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Risk Tolerance Slider */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-space-purple" />
              <span>Risk Tolerance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Risk Level: {riskTolerance[0]}%</Label>
                <Badge variant={riskTolerance[0] > 70 ? "destructive" : riskTolerance[0] > 40 ? "secondary" : "default"}>
                  {riskTolerance[0] > 70 ? "High Risk" : riskTolerance[0] > 40 ? "Medium Risk" : "Low Risk"}
                </Badge>
              </div>
              <Slider
                value={riskTolerance}
                onValueChange={setRiskTolerance}
                max={100}
                step={5}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Aggressive</span>
              </div>
            </div>
            
            <div>
              <Label>Time Horizon</Label>
              <RadioGroup value={timeHorizon} onValueChange={setTimeHorizon} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Short-term (&lt; 1 year)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium-term" />
                  <Label htmlFor="medium-term">Medium-term (1-5 years)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long-term (5+ years)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* AI Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-gui-orange" />
              <span>AI Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Execute Trades</Label>
                <p className="text-sm text-muted-foreground">
                  Let AI execute recommended trades automatically
                </p>
              </div>
              <Switch checked={autoExecute} onCheckedChange={setAutoExecute} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Real-time Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about market opportunities
                </p>
              </div>
              <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            </div>
            
            {autoExecute && (
              <div className="p-3 bg-doge-yellow/20 border border-doge-yellow rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-doge-yellow" />
                  <span className="text-sm font-medium">Auto-execution requires $GUI fees</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Small fees in $GUI are charged for automated trade execution
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Degen Mode Section */}
      <Card className={degenModeEnabled ? 'gradient-degen text-white border-space-purple' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="w-5 h-5" />
            <span>Degen Mode Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img 
                src={degenMode} 
                alt="Degen Mode" 
                className={`w-12 h-12 ${degenModeEnabled ? 'animate-wiggle' : ''}`} 
              />
              <div>
                <h3 className="font-semibold">Ultra High-Risk Mode</h3>
                <p className={`text-sm ${degenModeEnabled ? 'text-white/90' : 'text-muted-foreground'}`}>
                  Unlock experimental strategies and meme-powered opportunities
                </p>
              </div>
            </div>
            <Switch checked={degenModeEnabled} onCheckedChange={onDegenModeToggle} />
          </div>
          
          {degenModeEnabled && (
            <div className="p-4 bg-white/10 rounded-lg">
              <h4 className="font-semibold mb-2">🚀 Degen Features Unlocked:</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Experimental yield farming strategies</li>
                <li>• Meme token opportunities</li>
                <li>• Flash loan arbitrage plays</li>
                <li>• Community-voted degen plays</li>
                <li>• Diamond hands challenges</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Governance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-space-purple" />
            <span>Community Governance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 gradient-gui text-white rounded-lg">
              <h3 className="font-semibold mb-2">Vote with $GUI</h3>
              <p className="text-sm opacity-90 mb-3">
                Help shape the future of the AI mentor by voting on new features and strategies.
              </p>
              <Button variant="secondary" size="sm">
                View Active Proposals
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Current Vote</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Add NFT rewards for staking milestones?
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="defi">Yes (78%)</Button>
                  <Button size="sm" variant="outline">No (22%)</Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Your Voting Power</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Based on your $GUI holdings
                </p>
                <Badge className="gradient-gui text-white">1,542 votes</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button variant="hero" size="xl" onClick={handleSaveSettings}>
          <Settings className="w-5 h-5" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};