"use client";

import { useContactQuery } from "@/services/queries/contact.queries";
import { ContactInfo } from "@/type/contact.type";
import { Card, Group, Text, Badge, Loader, TextInput, Button } from "@mantine/core";
import { useEffect, useState } from "react";

export default function ContactList() {
    const [value , setValue ] = useState('');
  const { data, isLoading, isError, error } = useContactQuery();
  const [filtered, setFiltered] = useState<[]>(data);
 useEffect(() => {
    setFiltered(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" variant="dots" />
      </div>
    );
  }

  if (isError) {
    return (
     
        error?.message || "Something went wrong while fetching contacts."
    
    );
  }

  function handleSearch () {
   const filterd = data.filter((contact:ContactInfo)=> {
   return contact.name === value

   })
   setFiltered(filterd);
  }
  return (
    <div className="max-w-3xl mx-auto p-6">
          <Group>
      <TextInput
        placeholder="Search..."
        value={value}
        onChange={(e)=>setValue(e.target.value)}
             />
      <Button disabled={!value} onClick={handleSearch}>
        Search
      </Button>
    </Group>

      <Text size="xl" fw={700} mb="lg">
        📒 Contacts
      </Text>

      {filtered?.map((contact: ContactInfo) => (
        <Card
          key={contact.email}
          shadow="sm"
          radius="md"
          withBorder
          mb="md"
          padding="lg"
        >
          <Group justify="space-between" mb="xs">
            <Text fw={600} size="lg">
              {contact.name}
            </Text>
            <Badge color="blue" variant="light">
              ID: {contact.email}
            </Badge>
          </Group>

          <Text size="sm" c="dimmed">
            ✉️ {contact.email}
          </Text>
          <Text size="sm" c="dimmed">
            📞 {contact.phone}
          </Text>
        </Card>
      ))}
    </div>
  );
}
