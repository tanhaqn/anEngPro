

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-manager',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-manager.html'
})
export class UserManagerComponent {
    users = [
        { id: 1, name: 'Admin Account', email: 'admin@aneng.pro', role: 'Admin', joinedDate: '2025-01-01' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', joinedDate: '2025-12-05' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joinedDate: '2025-12-06' },
        { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', joinedDate: '2025-12-07' },
    ];
}
