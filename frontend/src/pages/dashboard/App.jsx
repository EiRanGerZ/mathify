import React from 'react';
import { Logo } from '../../shared/icons.jsx';
import { Nav } from '../../shared/Nav.jsx';
import { Toast } from '../../shared/Toast.jsx';
import { Greeting } from './Greeting.jsx';
import { ContinueCard } from './ContinueCard.jsx';
import { StatsRow } from './StatsRow.jsx';
import { QuestsPanel } from './QuestsPanel.jsx';
import { AchievementsCard } from './AchievementsCard.jsx';

export const App = () => (
  <div>
    <Toast/>
    <Nav/>
    <main className="px-4 sm:px-6 lg:px-7 pb-20" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <Greeting/>
      <ContinueCard/>
      <StatsRow/>
      <div className="mt-[18px]">
        <QuestsPanel/>
      </div>
      <div className="mt-[18px]">
        <AchievementsCard/>
      </div>
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Logo/><span>Mathify · v2.4 · last sync 2m ago</span></div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="#" style={{ color: 'var(--ink-3)' }}>Help</a>
          <a href="#" style={{ color: 'var(--ink-3)' }}>Settings</a>
          <a href="#" style={{ color: 'var(--ink-3)' }}>What's new</a>
        </div>
      </div>
    </main>
  </div>
);
