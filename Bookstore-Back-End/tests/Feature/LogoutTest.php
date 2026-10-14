<?php

namespace Tests\Feature;

use Tests\TestCase;

class LogoutTest extends TestCase
{
    public function test_logout_requires_authentication(): void
    {
        $this->postJson('/api/logout')->assertUnauthorized();
    }
}
