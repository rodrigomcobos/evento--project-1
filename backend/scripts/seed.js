import {
  db,
  User,
  Event,
  Booking,
  Review,
  Role,
  Payment,
} from '../models/index.js';
import bcrypt from 'bcrypt';

// ... rest of your seed.js file remains the same

const seed = async () => {
  try {
    // Sync all models with the database
    await db.sync({ force: true });
    console.log('Database synced');

    // Create roles
    const [adminRole, userRole] = await Promise.all([
      Role.create({ name: 'admin', description: 'Administrator' }),
      Role.create({ name: 'user', description: 'Regular user' }),
    ]);
    console.log('Roles created');

    // Create users
    const passwordHash = await bcrypt.hash('password123', 10);
    const [admin, user1, user2] = await Promise.all([
      User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: passwordHash,
        first_name: 'Admin',
        last_name: 'User',
        role_id: adminRole.id,
      }),
      User.create({
        username: 'user1',
        email: 'user1@example.com',
        password: passwordHash,
        first_name: 'John',
        last_name: 'Doe',
        role_id: userRole.id,
      }),
      User.create({
        username: 'user2',
        email: 'user2@example.com',
        password: passwordHash,
        first_name: 'Jane',
        last_name: 'Smith',
        role_id: userRole.id,
      }),
    ]);
    console.log('Users created');

    // Create events
    const [event1, event2] = await Promise.all([
      Event.create({
        title: 'Summer Concert',
        description: 'A night of great music',
        date: new Date('2023-07-15'),
        location: 'Central Park',
        capacity: 1000,
        price: 50.0,
        image_url: 'https://example.com/concert.jpg',
      }),
      Event.create({
        title: 'Tech Conference',
        description: 'Learn about the latest technologies',
        date: new Date('2023-09-20'),
        location: 'Convention Center',
        capacity: 500,
        price: 100.0,
        image_url: 'https://example.com/conference.jpg',
      }),
    ]);
    console.log('Events created');

    // Create bookings
    const [booking1, booking2] = await Promise.all([
      Booking.create({
        user_id: user1.id,
        event_id: event1.id,
        status: 'confirmed',
      }),
      Booking.create({
        user_id: user2.id,
        event_id: event2.id,
        status: 'pending',
      }),
    ]);
    console.log('Bookings created');

    // Create reviews
    await Promise.all([
      Review.create({
        user_id: user1.id,
        event_id: event1.id,
        rating: 5,
        comment: 'Great concert!',
      }),
      Review.create({
        user_id: user2.id,
        event_id: event2.id,
        rating: 4,
        comment: 'Informative conference',
      }),
    ]);
    console.log('Reviews created');

    // Create payments
    await Promise.all([
      Payment.create({
        booking_id: booking1.id,
        amount: 50.0,
        payment_method: 'credit_card',
        status: 'completed',
        transaction_id: 'txn_123456',
      }),
      Payment.create({
        booking_id: booking2.id,
        amount: 100.0,
        payment_method: 'paypal',
        status: 'pending',
        transaction_id: 'txn_789012',
      }),
    ]);
    console.log('Payments created');

    // Test queries
    console.log('\nRunning test queries:');

    // Test User model
    const testUser = await User.findOne({
      where: { username: 'user1' },
      include: [Role],
    });
    console.log('Test User:', testUser.toJSON());

    // Test Event model
    const testEvent = await Event.findOne({
      where: { title: 'Summer Concert' },
      include: [Booking, Review],
    });
    console.log('Test Event:', testEvent.toJSON());

    // Test Booking model
    const testBooking = await Booking.findOne({
      where: { status: 'confirmed' },
      include: [User, Event, Payment],
    });
    console.log('Test Booking:', testBooking.toJSON());

    // Test Review model
    const testReview = await Review.findOne({
      where: { rating: 5 },
      include: [User, Event],
    });
    console.log('Test Review:', testReview.toJSON());

    // Test Payment model
    const testPayment = await Payment.findOne({
      where: { status: 'completed' },
      include: [Booking],
    });
    console.log('Test Payment:', testPayment.toJSON());

    console.log('Seeding and tests completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.close();
  }
};

seed();
