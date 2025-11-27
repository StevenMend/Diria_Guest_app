import { useState, useMemo } from 'react';
import { Users, DollarSign, Activity, Star } from 'lucide-react';

export const useAdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  
  // Configuración estática
  const timeframes = ['Today', 'Week', 'Month', 'Quarter'];
  const departments = ['All', 'Tours', 'Restaurants', 'Spa', 'Front Desk'];

  // KPIs calculados basados en filtros
  const kpis = useMemo(() => [
    {
      title: 'Occupancy Rate',
      value: '89%', 
      change: '+5%',
      trend: 'up' as const,
      icon: Users,
      color: 'blue' as const,
      detail: '$312 avg room rate',
      calculation: 'Real-time booking system',
      target: 92,
      current: 89,
      forecast: '+2% next week',
      benchmark: 'Industry: 84%'
    },
    {
      title: 'Daily Revenue',
      value: '$47K',
      change: '+18%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'green' as const,
      detail: '23% profit margin',
      calculation: 'All revenue streams',
      target: 50000,
      current: 47000,
      forecast: '+$8K tomorrow',
      benchmark: 'Target: $50K'
    },
    {
      title: 'Operational Efficiency',
      value: '92%',
      change: '+3%',
      trend: 'up' as const,
      icon: Activity,
      color: 'purple' as const,
      detail: '11.2 min avg response',
      calculation: 'Response time tracking',
      target: 95,
      current: 92,
      forecast: 'Improving trend',
      benchmark: 'Best: 96%'
    },
    {
      title: 'Guest Satisfaction',
      value: '4.6/5',
      change: '+0.3',
      trend: 'up' as const,
      icon: Star,
      color: 'yellow' as const,
      detail: '2 complaints today',
      calculation: '156 reviews this week',
      target: 4.8,
      current: 4.6,
      forecast: '+0.1 this week',
      benchmark: 'Luxury: 4.7/5'
    }
  ], [selectedTimeframe, selectedDepartment]);

  // Resort Heat Map data
  const resortHeatMap = useMemo(() => [
    { area: 'Main Pool', status: 'optimal' as const, load: 78, issues: 0, revenue: '$8.2K' },
    { area: 'Beach Club', status: 'attention' as const, load: 92, issues: 1, revenue: '$12.4K' },
    { area: 'Spa Center', status: 'optimal' as const, load: 65, issues: 0, revenue: '$6.8K' },
    { area: 'Restaurants', status: 'crisis' as const, load: 98, issues: 3, revenue: '$15.2K' },
    { area: 'Tours Desk', status: 'optimal' as const, load: 82, issues: 0, revenue: '$9.6K' },
    { area: 'Front Lobby', status: 'attention' as const, load: 88, issues: 1, revenue: '$3.4K' }
  ], [selectedTimeframe]);

  // Department Status
  const departmentStatus = useMemo(() => [
    { name: 'Tours', status: 'optimal' as const, load: 85, revenue: '$18.2K', efficiency: 94, trend: 'up', alerts: 0, satisfaction: 4.8 },
    { name: 'Restaurants', status: 'high' as const, load: 92, revenue: '$15.8K', efficiency: 89, trend: 'stable', alerts: 2, satisfaction: 4.6 },
    { name: 'Spa', status: 'optimal' as const, load: 78, revenue: '$8.4K', efficiency: 96, trend: 'up', alerts: 0, satisfaction: 4.9 },
    { name: 'Front Desk', status: 'normal' as const, load: 65, revenue: '$4.6K', efficiency: 91, trend: 'up', alerts: 1, satisfaction: 4.5 }
  ], [selectedDepartment]);

  // Revenue Breakdown
  const revenueBreakdown = useMemo(() => [
    { 
      service: 'Accommodations', 
      revenue: '$28.2K', 
      margin: '45%', 
      upsell: '23%',
      trend: 'up' as const,
      details: 'Premium suites driving margin',
      growth: '+12%',
      forecast: '$32K',
      efficiency: 94
    },
    { 
      service: 'Tours & Activities', 
      revenue: '$12.8K', 
      margin: '35%', 
      upsell: '67%',
      trend: 'up' as const,
      details: 'Catamaran tours highest conversion',
      growth: '+24%',
      forecast: '$15K',
      efficiency: 89
    },
    { 
      service: 'Food & Beverage', 
      revenue: '$8.4K', 
      margin: '28%', 
      upsell: '45%',
      trend: 'down' as const,
      details: 'El Pelícano underperforming',
      growth: '-3%',
      forecast: '$8.1K',
      efficiency: 76
    },
    { 
      service: 'Spa & Wellness', 
      revenue: '$6.2K', 
      margin: '52%', 
      upsell: '78%',
      trend: 'up' as const,
      details: 'Couples packages high margin',
      growth: '+18%',
      forecast: '$7.3K',
      efficiency: 97
    }
  ], [selectedTimeframe]);

  // Staff Performance
  const staffPerformance = useMemo(() => [
    { 
      name: 'Ana Gutierrez', 
      department: 'Tours', 
      rating: 4.9, 
      completed: 23, 
      avgTime: '12 min',
      efficiency: 96,
      trainingNeeds: [] as string[],
      schedule: 'Optimal',
      revenue: '$3.2K',
      growth: '+15%',
      streak: 12,
      certifications: ['Safety', 'Customer Service'],
      performance: 'exceptional' as const
    },
    { 
      name: 'Miguel Santos', 
      department: 'Restaurants', 
      rating: 4.8, 
      completed: 19, 
      avgTime: '8 min',
      efficiency: 94,
      trainingNeeds: ['Dietary restrictions'],
      schedule: 'Optimal',
      revenue: '$2.8K',
      growth: '+8%',
      streak: 7,
      certifications: ['Food Safety'],
      performance: 'excellent' as const
    },
    { 
      name: 'Carmen Vega', 
      department: 'Spa', 
      rating: 4.9, 
      completed: 15, 
      avgTime: '15 min',
      efficiency: 92,
      trainingNeeds: [] as string[],
      schedule: 'Underutilized',
      revenue: '$4.1K',
      growth: '+22%',
      streak: 18,
      certifications: ['Wellness', 'Massage Therapy'],
      performance: 'exceptional' as const
    },
    { 
      name: 'Luis Morales', 
      department: 'Front Desk', 
      rating: 4.7, 
      completed: 28, 
      avgTime: '6 min',
      efficiency: 98,
      trainingNeeds: [] as string[],
      schedule: 'Optimal',
      revenue: '$1.9K',
      growth: '+5%',
      streak: 9,
      certifications: ['Hospitality', 'Languages'],
      performance: 'excellent' as const
    },
    { 
      name: 'Sofia Rodriguez', 
      department: 'Tours', 
      rating: 4.6, 
      completed: 17, 
      avgTime: '14 min',
      efficiency: 87,
      trainingNeeds: ['Partner coordination', 'Time management'],
      schedule: 'Needs optimization',
      revenue: '$2.4K',
      growth: '+3%',
      streak: 4,
      certifications: ['Basic Safety'],
      performance: 'good' as const
    }
  ], [selectedDepartment]);

  // Partner Performance
  const partnerPerformance = useMemo(() => [
    { 
      name: 'Catamaran Adventures', 
      score: 96, 
      bookings: 45, 
      revenue: '$3.8K', 
      status: 'excellent' as const,
      contractCompliance: 98,
      paymentStatus: 'current' as const,
      responseTime: '8 min',
      commission: '15%',
      issues: 0,
      reliability: 99,
      growth: '+18%',
      satisfaction: 4.9,
      tier: 'platinum' as const
    },
    { 
      name: 'ATV Volcano Tours', 
      score: 89, 
      bookings: 32, 
      revenue: '$3.2K', 
      status: 'good' as const,
      contractCompliance: 92,
      paymentStatus: 'current' as const,
      responseTime: '12 min',
      commission: '18%',
      issues: 1,
      reliability: 94,
      growth: '+12%',
      satisfaction: 4.7,
      tier: 'gold' as const
    },
    { 
      name: 'Horseback Expeditions', 
      score: 92, 
      bookings: 28, 
      revenue: '$2.1K', 
      status: 'excellent' as const,
      contractCompliance: 95,
      paymentStatus: 'current' as const,
      responseTime: '6 min',
      commission: '12%',
      issues: 0,
      reliability: 97,
      growth: '+8%',
      satisfaction: 4.8,
      tier: 'gold' as const
    },
    { 
      name: 'Deep Sea Fishing Co.', 
      score: 85, 
      bookings: 12, 
      revenue: '$5.4K', 
      status: 'good' as const,
      contractCompliance: 88,
      paymentStatus: 'overdue' as const,
      responseTime: '18 min',
      commission: '20%',
      issues: 2,
      reliability: 89,
      growth: '+5%',
      satisfaction: 4.5,
      tier: 'silver' as const
    },
    { 
      name: 'Spa Wellness Center', 
      score: 94, 
      bookings: 38, 
      revenue: '$4.6K', 
      status: 'excellent' as const,
      contractCompliance: 97,
      paymentStatus: 'current' as const,
      responseTime: '5 min',
      commission: '10%',
      issues: 0,
      reliability: 98,
      growth: '+25%',
      satisfaction: 4.9,
      tier: 'platinum' as const
    }
  ], [selectedTimeframe]);

  return {
    // Data
    kpis,
    resortHeatMap,
    departmentStatus,
    revenueBreakdown,
    staffPerformance,
    partnerPerformance,
    
    // UI State
    selectedTimeframe,
    setSelectedTimeframe,
    selectedDepartment,
    setSelectedDepartment,
    
    // Constants
    timeframes,
    departments,
  };
};