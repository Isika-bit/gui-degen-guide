import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Bell, 
  Settings, 
  Brain, 
  Crown,
  Zap,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import guiInuMascot from '@/assets/gui-inu-mascot.png';
import guiToken from '@/assets/gui-token.png';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasPremium: boolean;
  degenModeEnabled: boolean;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  hasPremium,
  degenModeEnabled,
  mobileMenuOpen,
  onMobileMenuToggle
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const NavContent = () => (
    <>
      {/* Logo and Branding */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="animate-float">
          <img src={guiInuMascot} alt="GUI INU" className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gui">GUI AI DeFi</h1>
          <p className="text-sm text-muted-foreground">Mentor</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2 mb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "gui" : "ghost"}
              className={`w-full justify-start space-x-3 ${
                isActive ? 'shadow-gui' : 'hover:bg-secondary'
              }`}
              onClick={() => {
                onTabChange(item.id);
                onMobileMenuToggle(); // Close mobile menu on selection
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.id === 'alerts' && !hasPremium && (
                <Crown className="w-4 h-4 text-defi-gold ml-auto" />
              )}
            </Button>
          );
        })}
      </nav>

      {/* Status Cards */}
      <div className="space-y-4 mb-8">
        {/* Premium Status */}
        <div className={`p-4 rounded-lg ${
          hasPremium 
            ? 'gradient-gui text-white' 
            : 'border border-dashed border-muted-foreground'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {hasPremium ? (
              <Crown className="w-5 h-5" />
            ) : (
              <Crown className="w-5 h-5 text-defi-gold" />
            )}
            <span className="font-semibold">
              {hasPremium ? 'Premium Active' : 'Free Plan'}
            </span>
          </div>
          <p className={`text-sm ${
            hasPremium ? 'text-white/90' : 'text-muted-foreground'
          }`}>
            {hasPremium 
              ? 'Enjoying premium AI features'
              : 'Upgrade for advanced features'
            }
          </p>
        </div>

        {/* Degen Mode Status */}
        {degenModeEnabled && (
          <div className="gradient-degen text-white p-4 rounded-lg animate-glow">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">DEGEN MODE</span>
            </div>
            <p className="text-sm text-white/90">
              🚀 Ultra high-risk mode active!
            </p>
          </div>
        )}

        {/* AI Status */}
        <div className="p-4 rounded-lg bg-muted">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-space-purple" />
            <span className="font-semibold">AI Status</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-defi-green rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Online & Learning</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
          <span className="text-sm text-muted-foreground">Portfolio Value</span>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-defi-green" />
            <span className="font-semibold text-defi-green">$12,847</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
          <span className="text-sm text-muted-foreground">$GUI Balance</span>
          <div className="flex items-center space-x-1">
            <img src={guiToken} alt="$GUI" className="w-4 h-4" />
            <span className="font-semibold">15,420.69</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
          <span className="text-sm text-muted-foreground">Daily P&L</span>
          <span className="font-semibold text-defi-green">+$234.56</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-card border-r border-border p-6 h-screen overflow-y-auto">
        <NavContent />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="gui"
          size="icon"
          onClick={onMobileMenuToggle}
          className="shadow-gui"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onMobileMenuToggle}
          />
          
          {/* Sidebar */}
          <div className="lg:hidden fixed left-0 top-0 w-80 bg-card border-r border-border p-6 h-screen overflow-y-auto z-50 transform transition-transform duration-300">
            <NavContent />
          </div>
        </>
      )}
    </>
  );
};