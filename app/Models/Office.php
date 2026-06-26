<?php

namespace App\Models;

class Office
{
    public string $slug;
    public string $name;
    public string $description;
    public int $floor;
    public string $room;
    public string $hours;
    public string $contact;
    public string $email;
    public string $head;
    public array $services;

    public function __construct(array $attributes)
    {
        foreach ($attributes as $key => $value) {
            $this->$key = $value;
        }
    }

    public static function all(): array
    {
        return [
            new self([
                'slug' => 'civil-registry',
                'name' => 'Civil Registry Office',
                'description' => 'Handles birth, marriage, and death certificates.',
                'floor' => 1,
                'room' => 'Room 101',
                'hours' => '8:00 AM - 5:00 PM',
                'contact' => '(02) 1234-5678',
                'email' => 'civilregistry@example.gov.ph',
                'head' => 'Juan Dela Cruz',
                'services' => [
                    'Birth Certificate',
                    'Marriage Certificate',
                    'Death Certificate',
                    'CENOMAR',
                ],
            ]),
            // add more offices here
        ];
    }

    public static function find(string $slug): ?self
    {
        foreach (self::all() as $office) {
            if ($office->slug === $slug) {
                return $office;
            }
        }

        return null;
    }
}