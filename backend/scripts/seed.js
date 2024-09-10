import { Sequelize } from 'sequelize';
import { User, Role, Event, Booking, Review, Payment } from '../models';

// Create roles and users to seed the database
const seed = async () => {
  try {
    // 1. Sync the database schema
    await Sequelize.sync({ force: true });
    console.log('Database synced!');

    // 2. Create roles
    const adminRole = await Role.create({ role_name: 'admin' });
    const userRole = await Role.create({ role_name: 'user' });
    console.log('Roles created!');

    // 3. Create users
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpassword', 10),
      role_id: adminRole.id,
    });

    const regularUser = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.hash('password123', 10),
      role_id: userRole.id,
    });
    console.log('Users created!');

    // 4. Create events
    const event1 = await Event.create({
      name: 'Music Festival',
      description: 'An awesome outdoor music festival.',
      date: '2024-10-01',
      location: 'New York',
      capacity: 500,
      available_seats: 500,
    });

    const event2 = await Event.create({
      name: 'Tech Conference',
      description: 'Annual tech conference featuring industry leaders.',
      date: '2024-11-15',
      location: 'San Francisco',
      capacity: 300,
      available_seats: 300,
    });
    console.log('Events created!');

    // 5. Create bookings
    await Booking.create({
      user_id: regularUser.id,
      event_id: event1.id,
      booking_date: new Date(),
      status: 'confirmed',
    });

    await Booking.create({
      user_id: regularUser.id,
      event_id: event2.id,
      booking_date: new Date(),
      status: 'confirmed',
    });
    console.log('Bookings created!');

    // 6. Create reviews
    await Review.create({
      user_id: regularUser.id,
      event_id: event1.id,
      rating: 5,
      review_text: 'Fantastic event, highly recommend!',
      review_date: new Date(),
    });
    console.log('Reviews created!');

    // 7. Create payments
    await Payment.create({
      booking_id: 1,
      payment_status: 'completed',
      amount: 50.0,
    });
    console.log('Payments created!');

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

seed();
