import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Zap, TrendingUp, AlertTriangle, Crown, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import guiToken from '@/assets/gui-token.png';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'premium';
  timestamp: Date;
  actionable: boolean;
  guiCost?: number;
}

interface AlertsInterfaceProps {
  hasPremium: boolean;
  onSubscribe: () => void;
}

export const AlertsInterface: React.FC<AlertsInterfaceProps> = ({ hasPremium, onSubscribe }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time alerts
    const generateAlerts = () => {
      const baseAlerts: Alert[] = [
        {
          id: '1',
          title: 'APY Spike Detected!',
          message: 'Echelon Market $GUI staking APY increased to 15.2% (+2.7%)',
          type: 'success',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          actionable: true
        },
        {
          id: '2',
          title: 'Risk Alert',
          message: 'High volatility detected in GUI-APT pool. Consider reducing exposure.',
          type: 'warning',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          actionable: false
        },
        {
          id: '3',
          title: 'Market Update',
          message: 'Aptos TVL increased by 12% in the last 24h. Perfect time to stake!',
          type: 'info',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          actionable: true
        }
      ];

      const premiumAlerts: Alert[] = [
        {
          id: '4',
          title: '🔥 PREMIUM: Arbitrage Opportunity',
          message: 'Price difference detected between Liquidswap and PancakeSwap. Potential 3.2% profit!',
          type: 'premium',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          actionable: true,
          guiCost: 50
        },
        {
          id: '5',
          title: '💎 PREMIUM: Whale Movement',
          message: 'Large $GUI holder just staked 100K tokens. Follow the smart money?',
          type: 'premium',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          actionable: true,
          guiCost: 25
        }
      ];

      return hasPremium ? [...baseAlerts, ...premiumAlerts] : baseAlerts;
    };

    setTimeout(() => {
      setAlerts(generateAlerts());
      setLoading(false);
    }, 1000);

    // Simulate new alerts coming in
    const interval = setInterval(() => {
      if (!alertsEnabled) return;

      const newAlert: Alert = {
        id: Date.now().toString(),
        title: 'Live Update',
        message: 'New farming opportunity detected with 28.5% APY!',
        type: 'success',
        timestamp: new Date(),
        actionable: true
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      
      if (hasPremium) {
        toast.success("🔔 New premium alert!", {
          description: newAlert.message
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [hasPremium, alertsEnabled]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <TrendingUp className="w-5 h-5 text-defi-green" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-doge-yellow" />;
      case 'premium': return <Crown className="w-5 h-5 text-defi-gold" />;
      default: return <Bell className="w-5 h-5 text-inu-blue" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-4 border-defi-green bg-defi-green/10';
      case 'warning': return 'border-l-4 border-doge-yellow bg-doge-yellow/10';
      case 'premium': return 'border-l-4 border-defi-gold bg-defi-gold/10';
      default: return 'border-l-4 border-inu-blue bg-inu-blue/10';
    }
  };

  const handleAlertAction = (alert: Alert) => {
    if (alert.type === 'premium' && alert.guiCost) {
      toast.success(`🎯 Auto-executed trade!`, {
        description: `Spent ${alert.guiCost} $GUI for automated execution`
      });
    } else {
      toast.info("Alert action triggered!", {
        description: "Check your portfolio for updates"
      });
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Alert Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-gui-orange" />
            <span className="text-gui">Real-Time Market Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={alertsEnabled} 
                onCheckedChange={setAlertsEnabled}
              />
              <span>Enable Alerts</span>
            </div>
            
            {!hasPremium && (
              <Button variant="gui" onClick={onSubscribe}>
                <Crown className="w-4 h-4" />
                Upgrade to Premium
              </Button>
            )}
          </div>

          {!hasPremium && (
            <div className="gradient-gui text-white p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Premium Features</span>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Arbitrage opportunity alerts</li>
                <li>• Whale movement tracking</li>
                <li>• Automated trade execution</li>
                <li>• Priority market signals</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alerts Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Live Alert Feed</CardTitle>
            <Badge variant="secondary" className="gradient-defi text-white">
              {alerts.length} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-muted rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg ${getAlertColor(alert.type)} hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{alert.title}</h4>
                          {alert.type === 'premium' && (
                            <Badge className="gradient-gui text-white">
                              <Crown className="w-3 h-3 mr-1" />
                              PREMIUM
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(alert.timestamp)}
                          </span>
                          {alert.guiCost && (
                            <div className="flex items-center space-x-1 text-xs">
                              <img src={guiToken} alt="$GUI" className="w-4 h-4" />
                              <span>{alert.guiCost} $GUI</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {alert.actionable && (
                      <Button
                        size="sm"
                        variant={alert.type === 'premium' ? 'gui' : 'secondary'}
                        onClick={() => handleAlertAction(alert)}
                        className="ml-3"
                      >
                        {alert.type === 'premium' ? (
                          <>
                            <Sparkles className="w-3 h-3" />
                            Execute
                          </>
                        ) : (
                          <>
                            <Zap className="w-3 h-3" />
                            Act
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Options */}
      {hasPremium && (
        <Card className="gradient-gui text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Premium Active</h3>
                <p className="text-sm opacity-90">Enjoying exclusive alerts and auto-execution features</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};