import bcrypt from 'bcrypt';

const generateHashes = async () => {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  console.log('Admin password (admin123):', adminPassword);
  console.log('User password (user123):', userPassword);
};

generateHashes();
