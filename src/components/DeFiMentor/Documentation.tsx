import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Code, 
  Download, 
  ExternalLink,
  Target,
  Users,
  Zap,
  Shield,
  Brain,
  Rocket
} from 'lucide-react';

export const Documentation: React.FC = () => {
  const projectSummary = `GUI AI DeFi Mentor is an innovative AI-powered assistant built on the Aptos blockchain that revolutionizes DeFi strategy personalization. Using advanced machine learning algorithms, the platform analyzes user risk profiles, investment goals, and market conditions to provide tailored DeFi recommendations focusing on $GUI-based opportunities.

The platform features an intuitive meme-inspired interface that makes DeFi accessible to newcomers while providing sophisticated tools for experienced traders. Users can stake $GUI on Echelon Market, participate in yield farming, and access exclusive high-yield opportunities through AI-driven insights.

A standout feature is "Degen Mode" - an ultra-high-risk, high-reward mode that surfaces experimental strategies and meme token opportunities for users seeking maximum potential returns. The AI mentor continuously learns from market conditions and user preferences, delivering real-time alerts and automated trade execution capabilities.

Built with GUI INU's community-first philosophy, the platform emphasizes fun, accessibility, and meme culture while maintaining professional-grade DeFi functionality. All premium features are powered by $GUI utility token, creating a sustainable ecosystem that benefits token holders through governance participation and exclusive access to high-yield strategies.`;

  const guiUtility = [
    {
      category: "Subscription Payments",
      description: "Premium features require monthly $GUI payments",
      examples: ["Real-time market alerts", "Automated trade execution", "Advanced analytics", "Priority support"]
    },
    {
      category: "Performance Fees",
      description: "Optional $GUI fees for AI-executed profitable trades",
      examples: ["Auto-staking optimization", "Arbitrage execution", "Yield compounding", "Rebalancing services"]
    },
    {
      category: "Staking Rewards",
      description: "Stake $GUI to unlock exclusive high-yield recommendations",
      examples: ["Early access to new protocols", "Premium strategy insights", "Whale movement alerts", "Flash loan opportunities"]
    },
    {
      category: "Community Governance",
      description: "$GUI holders vote on platform development and features",
      examples: ["New AI strategy approval", "Risk parameter adjustments", "Feature prioritization", "Protocol integrations"]
    }
  ];

  const targetAudience = [
    {
      segment: "DeFi Novices",
      description: "New crypto users seeking guided entry into DeFi",
      needs: ["Educational content", "Risk-appropriate strategies", "Simple interfaces", "Safety features"]
    },
    {
      segment: "Experienced Traders",
      description: "Advanced users wanting AI-powered optimization",
      needs: ["Sophisticated analytics", "Automated execution", "Alpha generation", "Advanced strategies"]
    },
    {
      segment: "Aptos Community",
      description: "Aptos ecosystem participants seeking native DeFi tools",
      needs: ["Aptos-native integrations", "Low-cost transactions", "Ecosystem governance", "Community features"]
    }
  ];

  const aptosIntegration = `The GUI AI DeFi Mentor leverages Aptos blockchain's unique advantages to deliver superior user experience:

• **Ultra-Low Transaction Costs**: Aptos' efficient consensus mechanism enables micro-transactions for AI service fees and automated rebalancing without prohibitive gas costs.

• **Parallel Execution**: The platform utilizes Aptos' parallel processing capabilities to execute multiple DeFi strategies simultaneously, maximizing capital efficiency.

• **Move Language Security**: Smart contracts built with Move provide enhanced security for user funds and automated execution logic.

• **Echelon Market Integration**: Native integration with Echelon Market for $GUI staking, providing users with direct access to yield opportunities.

• **Wapal NFT Rewards**: Integration with Wapal protocol to offer NFT rewards for staking milestones and community participation.

• **Scalable Infrastructure**: Aptos' high throughput supports real-time market analysis and instant trade execution without network congestion.`;

  const extraPointsStrategy = `Our meme-driven approach maximizes Ideathon scoring through:

• **Degen Mentor Persona**: AI responds with humorous, meme-inspired language while maintaining professional advice quality.

• **Community Engagement**: $GUI-based voting mechanisms for new features, creating active community participation.

• **Visual Meme Integration**: GUI INU mascot and doge-themed graphics throughout the interface for memorable branding.

• **Gamification Elements**: Diamond hands challenges, staking streaks, and achievement NFTs to encourage long-term engagement.

• **Cultural Relevance**: Platform embraces crypto meme culture while solving real DeFi accessibility problems.

• **Technical Excellence**: Functional prototype demonstrates real $GUI utility and Aptos integration, showcasing platform viability.`;

  const downloadMockupData = () => {
    const mockupData = {
      dashboard: "Dashboard mockup showing personalized DeFi recommendations",
      alerts: "Real-time alert interface with $GUI payment integration",
      settings: "User preference settings with Degen Mode toggle",
      payment: "$GUI payment flow for premium feature access"
    };
    
    const blob = new Blob([JSON.stringify(mockupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gui-defi-mentor-mockups.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadProjectCode = () => {
    const readmeContent = `# GUI AI DeFi Mentor - Frontend Prototype

## Setup Instructions

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Start development server: \`npm run dev\`
4. Open http://localhost:8080

## Project Structure

- \`/src/components/DeFiMentor/\` - Main application components
- \`/src/assets/\` - Images and static assets
- \`/src/index.css\` - Design system with meme-inspired themes

## Features Demonstrated

- AI-powered recommendation engine
- $GUI token payment integration
- Degen Mode for high-risk strategies
- Real-time market alerts
- Aptos blockchain integration
- Meme-inspired UI/UX design

## Technology Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/ui components
- Lucide React icons
- Responsive design

## GUI INU Integration

This prototype showcases $GUI utility across:
- Premium subscriptions
- Automated trade fees
- Staking rewards
- Community governance

Built for GUI INU Ideathon 2025 - Consumer AI Apps & Degen DeFi category.
`;

    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gui mb-4">
          GUI AI DeFi Mentor - Project Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive project package for GUI INU Ideathon 2025
        </p>
        <Badge className="gradient-gui text-white mt-2">
          Consumer AI Apps & Degen DeFi Category
        </Badge>
      </div>

      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-gui-orange" />
            <span>Project Summary (250 words)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {projectSummary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* $GUI Utility Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-gui-orange" />
            <span>$GUI Utility Token Functions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {guiUtility.map((utility, index) => (
              <div key={index} className="border-l-4 border-gui-orange pl-4">
                <h3 className="font-semibold text-lg mb-2">{utility.category}</h3>
                <p className="text-muted-foreground mb-3">{utility.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {utility.examples.map((example, i) => (
                    <Badge key={i} variant="outline" className="justify-start">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-inu-blue" />
            <span>Target Audience</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetAudience.map((audience, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{audience.segment}</h3>
                <p className="text-sm text-muted-foreground mb-3">{audience.description}</p>
                <div className="space-y-1">
                  {audience.needs.map((need, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Target className="w-3 h-3 text-defi-green" />
                      <span className="text-xs">{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aptos Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-space-purple" />
            <span>Aptos Blockchain Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {aptosIntegration}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Extra Points Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="w-6 h-6 text-space-purple" />
            <span>Extra Points Strategy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {extraPointsStrategy}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Download Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-6 h-6 text-defi-green" />
            <span>Download Project Assets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="defi" 
              onClick={downloadMockupData}
              className="justify-start"
            >
              <Download className="w-4 h-4" />
              Download Mockup Data
            </Button>
            
            <Button 
              variant="gui" 
              onClick={downloadProjectCode}
              className="justify-start"
            >
              <Code className="w-4 h-4" />
              Download Project README
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              View Source Code
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => window.open('https://docs.aptoslabs.com', '_blank')}
            >
              <Brain className="w-4 h-4" />
              Aptos Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submission Checklist */}
      <Card className="gradient-gui text-white">
        <CardHeader>
          <CardTitle>Ideathon Submission Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ Project Summary (250 words)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ $GUI Utility Explanation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ Target Audience Definition</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ Visual Mockups Generated</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ Functional Front-End Prototype</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ Aptos Integration Details</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ Meme-Inspired Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">✅ Community Engagement Features</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};