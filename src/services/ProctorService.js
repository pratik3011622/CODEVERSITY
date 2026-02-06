// Simulated backend for Proctoring
// In a real app, this would send data to an API endpoint

class ProctorService {
    constructor() {
        this.snapshots = [];
        this.events = [];
        this.startTime = Date.now();
    }

    // Save a Base64 snapshot
    saveSnapshot(imageSrc, reason = 'Routine Check') {
        const snapshot = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            image: imageSrc,
            reason: reason,
            timeOffset: Math.floor((Date.now() - this.startTime) / 1000) // seconds from start
        };
        this.snapshots.push(snapshot);
        // Persist to local storage for demo
        localStorage.setItem('proctor_snapshots', JSON.stringify(this.snapshots));
        console.log('Proctor: Snapshot saved', reason);
    }

    // Save rrweb event buffer
    saveReplay(events) {
        this.events = events;
        localStorage.setItem('proctor_replay', JSON.stringify(events));
        console.log('Proctor: Replay saved', events.length, 'events');
    }

    getSnapshots() {
        return JSON.parse(localStorage.getItem('proctor_snapshots') || '[]');
    }

    getReplay() {
        return JSON.parse(localStorage.getItem('proctor_replay') || '[]');
    }

    clearData() {
        this.snapshots = [];
        this.events = [];
        localStorage.removeItem('proctor_snapshots');
        localStorage.removeItem('proctor_replay');
    }
}

export const proctorService = new ProctorService();
