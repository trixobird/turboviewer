'use client';

import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Flex,
} from '@mantine/core';
import { logger } from '@repo/logger';

export default function SignIn(): React.JSX.Element {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email.'),
      password: (value) => (value.length > 5 ? null : 'Password must be at least 5 characters long.'),
    },
  });
  const router = useRouter();
  const handleSubmit = (values: { email: string; password: string }): void => {
    logger.info(values);
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Flex direction="column" align="center" justify="center" mb="xl">
          <Title ta="center">Sign In</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Don&apos;t have an account yet?{' '}
            <Anchor
              size="sm"
              component="button"
              onClick={() => {
                router.push('/sign-up');
              }}
            >
              Sign up!
            </Anchor>
          </Text>
        </Flex>

        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          <TextInput
            label="Email"
            placeholder="you@example.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            key={form.key('password')}
            {...form.getInputProps('password')}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign In!
          </Button>
        </form>
      </Paper>
    </Container>
  );
}