import initializeDb from '../models/index.js';
import bcrypt from 'bcrypt';

const seed = async () => {
  let db;
  try {
    db = await initializeDb();
    const {
      User,
      Event,
      Booking,
      Review,
      Role,
      Payment,
      Venue,
      Classification,
    } = db;

    // Sync all models with the database
    await db.sequelize.sync({ force: true });
    console.log('Database synced');

    // Create roles
    const [adminRole, userRole] = await Promise.all([
      Role.create({ name: 'admin', description: 'Administrator' }),
      Role.create({ name: 'user', description: 'Regular user' }),
    ]);
    console.log('Roles created');

    // Create users
    const passwordHash = await bcrypt.hash('password123', 10);
    const [admin, user1, user2, rodrigo] = await Promise.all([
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
      User.create({
        username: 'rodrigomcobos',
        email: 'rodrigomcobos@gmail.com',
        password: passwordHash,
        first_name: 'Rodrigo',
        last_name: 'Cobos',
        role_id: userRole.id,
      }),
    ]);
    console.log('Users created');

    // Create venues
    const [venue1, venue2] = await Promise.all([
      Venue.create({
        name: 'Central Park',
        address: 'Central Park, New York, NY 10022',
        city: 'New York',
        country: 'United States',
        ticketmaster_id: 'KovZpZA7AAEA',
      }),
      Venue.create({
        name: 'Convention Center',
        address: '123 Convention St, San Francisco, CA 94111',
        city: 'San Francisco',
        country: 'United States',
        ticketmaster_id: 'KovZpZAJ6nlA',
      }),
    ]);
    console.log('Venues created');

    // Create classifications
    const [classification1, classification2] = await Promise.all([
      Classification.create({
        segment: 'Music',
        genre: 'Rock',
        ticketmaster_id: 'KZFzniwnSyZfZ7v7nJ',
      }),
      Classification.create({
        segment: 'Conference',
        genre: 'Technology',
        ticketmaster_id: 'KZFzniwnSyZfZ7v7nE',
      }),
    ]);
    console.log('Classifications created');

    // Create events
    const [event1, event2] = await Promise.all([
      Event.create({
        title: 'Summer Concert',
        description: 'A night of great music',
        date: new Date('2023-07-15'),
        price: 50.0,
        image_url: 'https://example.com/concert.jpg',
        ticketmaster_id: 'vvG1iZ4JQe9jhk',
        venueId: venue1.id,
        classificationId: classification1.id,
      }),
      Event.create({
        title: 'Tech Conference',
        description: 'Learn about the latest technologies',
        date: new Date('2023-09-20'),
        price: 100.0,
        image_url: 'https://example.com/conference.jpg',
        ticketmaster_id: 'vvG1iZ4JQe9jhl',
        venueId: venue2.id,
        classificationId: classification2.id,
      }),
    ]);
    console.log('Events created');

    // Create bookings
    const [booking1, booking2] = await Promise.all([
      Booking.create({
        user_id: user1.id,
        event_id: event1.ticketmaster_id,
        transaction_id: 'TXN123456',
        event_name: event1.title,
        event_date: event1.date,
        event_time: '19:00',
        event_location: `${venue1.name}, ${venue1.city}`,
        ticket_quantity: 2,
        seat_zone: 'WU',
        zone_number: 1,
        image_url: event1.image_url,
        status: 'confirmed',
      }),
      Booking.create({
        user_id: user2.id,
        event_id: event2.ticketmaster_id,
        transaction_id: 'TXN789012',
        event_name: event2.title,
        event_date: event2.date,
        event_time: '10:00',
        event_location: `${venue2.name}, ${venue2.city}`,
        ticket_quantity: 1,
        seat_zone: 'EM',
        zone_number: 2,
        image_url: event2.image_url,
        status: 'pending',
      }),
    ]);
    console.log('Bookings created');

    // Create reviews
    await Promise.all([
      Review.create({
        user_id: user1.id,
        event_id: event1.ticketmaster_id,
        rating: 5,
        comment: 'Great concert!',
        title: 'Amazing experience',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Review.create({
        user_id: user2.id,
        event_id: event2.ticketmaster_id,
        rating: 4,
        comment: 'Informative conference',
        title: 'Learned a lot',
        createdAt: new Date(),
        updatedAt: new Date(),
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
      include: [Venue, Classification],
    });
    console.log('Test Event:', testEvent.toJSON());

    // Test Booking model
    const testBooking = await Booking.findOne({
      where: { status: 'confirmed' },
      include: [User, Payment],
    });
    console.log('Test Booking:', testBooking.toJSON());

    // Test Review model
    const testReview = await Review.findOne({
      where: { rating: 5 },
      include: [User],
    });
    console.log('Test Review:', testReview.toJSON());

    // Test Payment model
    const testPayment = await Payment.findOne({
      where: { status: 'completed' },
      include: [Booking],
    });
    console.log('Test Payment:', testPayment.toJSON());

    // Test Venue model
    const testVenue = await Venue.findOne({
      where: { name: 'Central Park' },
      include: [Event],
    });
    console.log('Test Venue:', testVenue.toJSON());

    // Test Classification model
    const testClassification = await Classification.findOne({
      where: { segment: 'Music' },
      include: [Event],
    });
    console.log('Test Classification:', testClassification.toJSON());

    console.log('Seeding and tests completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (db) {
      await db.sequelize.close();
    }
  }
};

seed();
