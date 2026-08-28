-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hobbies table
CREATE TABLE hobbies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table (contact form submissions)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  request_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Projects: allow public select, only admin insert/update/delete
CREATE POLICY "Allow public to read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to insert projects" ON projects
  FOR INSERT WITH CHECK (auth.email() = '***REMOVED-EMAIL***');

CREATE POLICY "Allow admin to update projects" ON projects
  FOR UPDATE USING (auth.email() = '***REMOVED-EMAIL***');

CREATE POLICY "Allow admin to delete projects" ON projects
  FOR DELETE USING (auth.email() = '***REMOVED-EMAIL***');

-- Hobbies: allow public select, only admin insert/update/delete
CREATE POLICY "Allow public to read hobbies" ON hobbies
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to insert hobbies" ON hobbies
  FOR INSERT WITH CHECK (auth.email() = '***REMOVED-EMAIL***');

CREATE POLICY "Allow admin to update hobbies" ON hobbies
  FOR UPDATE USING (auth.email() = '***REMOVED-EMAIL***');

CREATE POLICY "Allow admin to delete hobbies" ON hobbies
  FOR DELETE USING (auth.email() = '***REMOVED-EMAIL***');

-- Leads: allow public insert (contact form), only admin read
CREATE POLICY "Allow public to insert leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin to read leads" ON leads
  FOR SELECT USING (auth.email() = '***REMOVED-EMAIL***');

-- Seed default data (optional)
INSERT INTO projects (title, description, image_url, link_url, order_index) VALUES
  ('The Way Of Life', '1M+ downloads on Steam. Indie game with strategic gameplay design and successful crowdfunding campaign.', 'https://images.unsplash.com/photo-1538481143235-56d34d7b17a0?w=500&h=300&fit=crop', 'https://store.steampowered.com', 1),
  ('Engie App', 'B2C mobile application for iOS and Android. Directed cloud operations, DevOps adoption, and full lifecycle management.', 'https://images.unsplash.com/photo-1512941691920-25bfb67cb2d7?w=500&h=300&fit=crop', 'https://engie.com', 2),
  ('Engie Customer Portal', 'Enterprise e-commerce platform serving 60+ sites. Managed digital customer touchpoints and experience orchestration.', 'https://images.unsplash.com/photo-1460925895917-aec73e3dedd9?w=500&h=300&fit=crop', 'https://engie.com', 3);

INSERT INTO hobbies (title, description, order_index) VALUES
  ('Cloud Technologies & AWS', 'Exploring emerging AWS technologies, staying at the forefront of cloud innovation and infrastructure evolution.', 1),
  ('Game Development & Indie Gaming', 'Passionate about game design, creative direction, and the indie gaming ecosystem. Co-founder of a successful Steam title.', 2),
  ('Tech Mentoring & Leadership', 'Mentoring aspiring cloud architects and technology leaders. Committed to developing the next generation of innovators.', 3);
