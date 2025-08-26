"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Paper,
  Title,
  Notification,
  Stack,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContactMutation } from "@/services/mutations/contact.mutation";

export default function ContactForm() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 6 ? "Name must have at least 6 characters" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email format",
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Phone must be 10 digits",
    },
  });

     const { mutate} = useContactMutation()

  const isError = false; // replace with your mutation state
  const isSuccess = false; // replace with your mutation state
  const route= useRouter();
  function handleContact(values: typeof form.values) {
    
      mutate(values, {
      onSuccess: () => {
        route.push("/contact-list");
      },
    });
  
  }

  return (
    <Paper
      shadow="md"
      radius="md"
      p="xl"
      withBorder
      className="max-w-lg mx-auto mt-12"
    >
      <Title order={2} ta="center" mb="md">
        📞 Contact Form
      </Title>

      <form onSubmit={form.onSubmit(handleContact)}>
        <Stack gap="md">
          {isError && (
            <Notification
              icon={<IconX size="1.2rem" />}
              color="red"
              title="Bummer!"
            >
              Something went wrong
            </Notification>
          )}

          {isSuccess && (
            <Notification
              icon={<IconCheck size="1.2rem" />}
              color="teal"
              title="All good!"
            >
              Your contact has been saved!
            </Notification>
          )}

          <TextInput
            withAsterisk
            label="Name"
            placeholder="John Doe"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <TextInput
            withAsterisk
            label="Phone"
            placeholder="1234567890"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" radius="md" size="md">
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}