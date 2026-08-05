import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Fit-Zone PostgreSQL Database Seeding...');

  // 1. Password Hashing with Argon2id
  const defaultPassword = await argon2.hash('FitZonePass2026!');

  // 2. Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@fitzone.com' },
    update: {},
    create: {
      email: 'admin@fitzone.com',
      passwordHash: defaultPassword,
      role: Role.ADMIN,
      profile: {
        create: {
          firstName: 'System',
          lastName: 'Administrator',
          fitnessGoal: 'Platform Management',
        },
      },
    },
  });

  console.log('✅ Created Admin User:', adminUser.email);

  // 3. Create Subscription Plans
  const basicPlan = await prisma.subscriptionPlan.upsert({
    where: { id: 'basic-plan' },
    update: {},
    create: {
      id: 'basic-plan',
      name: 'Basic Access',
      priceEur: 29.0,
      billingPeriod: '/month',
      description: 'Perfect for beginners starting their fitness journey.',
      features: [
        'Access to Gym Floor & Equipment',
        'Locker Room & Shower Access',
        'Free Fitness Orientation Session',
        'Fit-Zone Mobile App Access',
      ],
      tier: 'BASIC',
      isPopular: false,
    },
  });

  const proPlan = await prisma.subscriptionPlan.upsert({
    where: { id: 'pro-plan' },
    update: {},
    create: {
      id: 'pro-plan',
      name: 'Pro Athlete',
      priceEur: 59.0,
      billingPeriod: '/month',
      description: 'Best choice for serious fitness enthusiasts.',
      features: [
        'Everything in Basic Plan',
        'Unlimited Group Workout Classes',
        'Personalized AI Fitness Coach',
        '1 Weekly Trainer One-on-One',
        'Sauna & Recovery Lounge Access',
      ],
      tier: 'PRO',
      isPopular: true,
    },
  });

  const elitePlan = await prisma.subscriptionPlan.upsert({
    where: { id: 'elite-plan' },
    update: {},
    create: {
      id: 'elite-plan',
      name: 'Elite VIP Pass',
      priceEur: 99.0,
      billingPeriod: '/month',
      description: 'All-inclusive premium experience with 24/7 dedicated trainer.',
      features: [
        'Everything in Pro Plan',
        'Unlimited Personal Trainer Sessions',
        'Custom AI Nutrition & Macro Planning',
        '24/7 Priority VIP Club Access',
        'Free Supplement Starter Package',
      ],
      tier: 'ENTERPRISE',
      isPopular: false,
    },
  });

  console.log('✅ Created Subscription Plans:', [basicPlan.name, proPlan.name, elitePlan.name]);

  // 4. Create Trainers
  const alexUser = await prisma.user.upsert({
    where: { email: 'alex.morgan@fitzone.com' },
    update: {},
    create: {
      email: 'alex.morgan@fitzone.com',
      passwordHash: defaultPassword,
      role: Role.TRAINER,
      profile: { create: { firstName: 'Alex', lastName: 'Morgan' } },
      trainer: {
        create: {
          name: 'Alex Morgan',
          roleTitle: 'HIIT & Strength Coach',
          bio: 'Former athlete with 8+ years of experience in functional training.',
          imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
          rating: 4.9,
          hourlyRateEur: 75.0,
          specialties: {
            create: [{ name: 'HIIT' }, { name: 'Strength' }, { name: 'CrossFit' }],
          },
        },
      },
    },
    include: { trainer: true },
  });

  const sarahUser = await prisma.user.upsert({
    where: { email: 'sarah.lee@fitzone.com' },
    update: {},
    create: {
      email: 'sarah.lee@fitzone.com',
      passwordHash: defaultPassword,
      role: Role.TRAINER,
      profile: { create: { firstName: 'Sarah', lastName: 'Lee' } },
      trainer: {
        create: {
          name: 'Sarah Lee',
          roleTitle: 'Yoga & Mindfulness Expert',
          bio: 'Certified yoga instructor specializing in Vinyasa and meditation.',
          imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
          rating: 4.8,
          hourlyRateEur: 65.0,
          specialties: {
            create: [{ name: 'Yoga' }, { name: 'Pilates' }, { name: 'Meditation' }],
          },
        },
      },
    },
    include: { trainer: true },
  });

  console.log('✅ Created Trainers');

  // 5. Create Class Schedules
  if (alexUser.trainer) {
    await prisma.classSchedule.createMany({
      data: [
        { trainerId: alexUser.trainer.id, className: 'HIIT Burn', dayOfWeek: 'Monday', startTime: '6:00 AM', duration: '45 min', capacity: 20 },
        { trainerId: alexUser.trainer.id, className: 'Bootcamp', dayOfWeek: 'Friday', startTime: '6:30 AM', duration: '60 min', capacity: 25 },
      ],
    });
  }

  if (sarahUser.trainer) {
    await prisma.classSchedule.createMany({
      data: [
        { trainerId: sarahUser.trainer.id, className: 'Yoga Flow', dayOfWeek: 'Monday', startTime: '9:00 AM', duration: '60 min', capacity: 15 },
        { trainerId: sarahUser.trainer.id, className: 'Power Yoga', dayOfWeek: 'Friday', startTime: '12:00 PM', duration: '50 min', capacity: 15 },
      ],
    });
  }

  console.log('✅ Created Class Schedules');

  // 6. Create Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: adminUser.id,
        name: 'Emily Rodriguez',
        role: 'Member since 2023',
        quote: "FitZone completely transformed my fitness journey. The trainers are incredibly supportive and the community is motivating. I've never felt stronger!",
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        isApproved: true,
      },
      {
        userId: adminUser.id,
        name: 'James Carter',
        role: 'Premium Member',
        quote: 'The best gym experience I’ve ever had. From HIIT to yoga, every class is top-tier. The facilities are clean and the energy is unmatched.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        isApproved: true,
      },
    ],
  });

  console.log('✅ Created Reviews');
  console.log('🎉 Fit-Zone PostgreSQL Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
