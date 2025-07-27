import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Brain, FileText, Sparkles, Rocket } from 'lucide-react';
import { Navigation } from '@/components/DeFiMentor/Navigation';
import { Dashboard } from '@/components/DeFiMentor/Dashboard';
import { AlertsInterface } from '@/components/DeFiMentor/AlertsInterface';
import { SettingsPage } from '@/components/DeFiMentor/SettingsPage';
import { PaymentFlow } from '@/components/DeFiMentor/PaymentFlow';
import { Documentation } from '@/components/DeFiMentor/Documentation';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-banner.jpg';
import guiInuMascot from '@/assets/gui-inu-mascot.png';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [degenModeEnabled, setDegenModeEnabled] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  const [riskProfile, setRiskProfile] = useState('balanced');
  const [showPayment, setShowPayment] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDegenModeToggle = () => {
    setDegenModeEnabled(!degenModeEnabled);
    toast.success(
      !degenModeEnabled ? "🚀 DEGEN MODE ACTIVATED!" : "Degen mode disabled",
      {
        description: !degenModeEnabled 
          ? "Ultra high-risk strategies unlocked! YOLO responsibly!" 
          : "Back to normal risk levels"
      }
    );
  };

  const handleSubscriptionComplete = () => {
    setHasPremium(true);
    setShowPayment(false);
    toast.success("🎉 Welcome to GUI AI DeFi Mentor Premium!", {
      description: "All premium features are now unlocked!"
    });
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            degenModeEnabled={degenModeEnabled}
            onDegenModeToggle={handleDegenModeToggle}
          />
        );
      case 'alerts':
        return (
          <AlertsInterface 
            hasPremium={hasPremium}
            onSubscribe={() => setShowPayment(true)}
          />
        );
      case 'settings':
        return (
          <SettingsPage 
            degenModeEnabled={degenModeEnabled}
            onDegenModeToggle={handleDegenModeToggle}
            riskProfile={riskProfile}
            onRiskProfileChange={setRiskProfile}
          />
        );
      default:
        return <Dashboard degenModeEnabled={degenModeEnabled} onDegenModeToggle={handleDegenModeToggle} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="animate-float">
              <img src={guiInuMascot} alt="GUI INU" className="w-24 h-24" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gui mb-2">
                GUI AI DeFi Mentor
              </h1>
              <p className="text-xl">
                Your meme-powered AI assistant for Aptos DeFi strategies
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge className="gradient-gui text-white text-lg px-4 py-2">
              <Brain className="w-5 h-5 mr-2" />
              AI-Powered Recommendations
            </Badge>
            <Badge className="gradient-defi text-white text-lg px-4 py-2">
              <Sparkles className="w-5 h-5 mr-2" />
              $GUI Utility Token
            </Badge>
            <Badge className="gradient-degen text-white text-lg px-4 py-2">
              <Rocket className="w-5 h-5 mr-2" />
              Degen Mode Available
            </Badge>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => setActiveTab('dashboard')}
            >
              <Brain className="w-6 h-6" />
              Launch AI Mentor
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20"
              onClick={() => setShowDocumentation(true)}
            >
              <FileText className="w-6 h-6" />
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Main Application */}
      <div className="flex">
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasPremium={hasPremium}
          degenModeEnabled={degenModeEnabled}
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        
        <main className="flex-1 lg:ml-0 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6 ml-16">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gui capitalize">
                      {activeTab}
                    </h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowDocumentation(true)}
                    >
                      <FileText className="w-4 h-4" />
                      Docs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {renderActiveTab()}
          </div>
        </main>
      </div>

      {/* Payment Flow Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gui">Upgrade to Premium</DialogTitle>
          </DialogHeader>
          <PaymentFlow 
            onSubscriptionComplete={handleSubscriptionComplete}
            onClose={() => setShowPayment(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Documentation Dialog */}
      <Dialog open={showDocumentation} onOpenChange={setShowDocumentation}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gui">Project Documentation</DialogTitle>
          </DialogHeader>
          <Documentation />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
