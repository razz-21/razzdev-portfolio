<script lang="ts">
	import {
		BarChart3,
		Check,
		CircleCheck,
		Fingerprint,
		LayoutDashboard,
		MessageSquare,
		Plus,
		QrCode,
		Search
	} from '@lucide/svelte';
	let { kind }: { kind: 'pollify' | 'liceo' | 'attendance' } = $props();
</script>

<div class={['project-preview', kind]} aria-hidden="true">
	<div class="preview-grid"></div>
	{#if kind === 'pollify'}
		<div class="pollify-brand">
			<BarChart3 size={20} strokeWidth={2.2} /> pollify<span>Make every voice count.</span>
		</div>
		<div class="poll-window">
			<div class="window-top">
				<div class="window-dots"><i></i><i></i><i></i></div>
				<span>pollify / workspace</span><Plus size={11} />
			</div>
			<div class="poll-inner">
				<span class="preview-small">LET’S MAKE A DECISION</span>
				<h4>What should we build next?</h4>
				<p>Great ideas start with a conversation.</p>
				<div class="poll-answer">
					<span>A better digital experience</span><span>64%</span><i style="width:64%"></i>
				</div>
				<div class="poll-answer">
					<span>Something entirely new</span><span>28%</span><i style="width:28%"></i>
				</div>
				<div class="poll-answer">
					<span>A little of both</span><span>8%</span><i style="width:8%"></i>
				</div>
				<div class="poll-bottom">
					<span><i></i> LIVE RESULTS</span><span>Your voice matters ↗</span>
				</div>
			</div>
		</div>
		<div class="vote-toast">
			<span class="toast-check"><Check size={12} /></span> A little input. A bigger picture.
		</div>
	{:else if kind === 'liceo'}
		<div class="support-glow"></div>
		<div class="support-window">
			<aside>
				<span class="support-mark">l.</span><LayoutDashboard size={15} /><MessageSquare
					size={15}
				/><CircleCheck size={15} /><span class="aside-avatar">ER</span>
			</aside>
			<div class="support-main">
				<div class="support-top"><strong>liceo<span>8888</span></strong><Search size={12} /></div>
				<div class="support-heading">
					<div>
						<span class="preview-small">STUDENT SUPPORT, SIMPLIFIED</span>
						<h4>A little help goes a long way.</h4>
					</div>
					<span class="new-ticket"><Plus size={10} /> New ticket</span>
				</div>
				<div class="ticket-stats">
					<div><span>Open</span><strong>12</strong></div>
					<div><span>In progress</span><strong>08</strong></div>
					<div><span>Resolved</span><strong>36</strong></div>
				</div>
				<div class="ticket-list">
					<div>
						<span class="ticket-icon"><MessageSquare size={12} /></span><span
							>Library access request<small>Student services · Just now</small></span
						><span class="ticket-badge">Open</span>
					</div>
					<div>
						<span class="ticket-icon"><CircleCheck size={12} /></span><span
							>Campus Wi-Fi connection<small>IT support · Today</small></span
						><span class="ticket-badge resolved">Resolved</span>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="attendance-brand">
			<Fingerprint size={32} strokeWidth={1} />
			<div>Less admin.<br /><em>More getting things done.</em></div>
			<span>HSI ATTENDANCE / ANDROID</span>
		</div>
		<div class="phone">
			<div class="phone-camera"></div>
			<div class="phone-time">9:41 <span>▴ ▰</span></div>
			<div class="phone-greeting">A fresh start.<strong>Good morning.</strong></div>
			<div class="clock-face"><span>09:00</span><small>RIGHT ON TIME</small></div>
			<div class="clock-button"><Fingerprint size={15} /> Clock in</div>
			<div class="phone-activity">
				<span>TODAY’S ACTIVITY</span>
				<div>
					<CircleCheck size={14} />
					<p>Ready when you are<small>Make today a good one.</small></p>
				</div>
			</div>
			<div class="phone-bar"></div>
		</div>
		<div class="scan-badge">
			<QrCode size={23} strokeWidth={1.3} />
			<div>A simple scan.<br /><strong>You’re all set.</strong></div>
		</div>
	{/if}
	<span class="illustration-label">INTERFACE ILLUSTRATION</span>
</div>

<style>
	.project-preview {
		position: relative;
		isolation: isolate;
		height: 355px;
		overflow: hidden;
		border: 1px solid #ffffff10;
		border-radius: 16px;
	}
	.preview-grid {
		position: absolute;
		inset: 0;
		z-index: -1;
		background-image:
			linear-gradient(#ffffff03 1px, transparent 1px),
			linear-gradient(90deg, #ffffff03 1px, transparent 1px);
		background-size: 44px 44px;
		mask-image: radial-gradient(ellipse, black, transparent 85%);
	}
	.pollify {
		background: radial-gradient(ellipse at 50% 100%, #34313e, #16151a 72%);
	}
	.pollify-brand {
		position: absolute;
		left: 34px;
		top: 24px;
		display: flex;
		gap: 7px;
		font-size: 22px;
		font-weight: 600;
		align-items: center;
		letter-spacing: -0.05em;
		color: #e8e5f0;
	}
	.pollify-brand > span {
		font-size: 9px;
		font-weight: 300;
		letter-spacing: 0.01em;
		color: #aaa4b7;
		margin-left: 10px;
	}
	.poll-window {
		position: absolute;
		width: 70%;
		top: 79px;
		left: 13%;
		background: #f6f5f8;
		border-radius: 9px;
		color: #35303e;
		transform: perspective(1000px) rotateY(-5deg) rotateZ(-5deg);
		box-shadow:
			12px 30px 55px #0008,
			inset 0 0 0 1px #ffffff;
	}
	.window-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 9px 12px;
		border-bottom: 1px solid #2822320d;
		color: #9f9aa6;
		font-size: 7px;
	}
	.window-dots {
		display: flex;
		gap: 4px;
	}
	.window-dots i {
		width: 4px;
		height: 4px;
		background: #ccc7d2;
		border-radius: 50%;
	}
	.poll-inner {
		padding: 22px 25px;
	}
	.preview-small {
		font-size: 6px;
		letter-spacing: 0.13em;
		color: #9b93a7;
		font-weight: 500;
	}
	h4 {
		margin: 7px 0 4px;
		font-size: 18px;
		letter-spacing: -0.045em;
		font-weight: 500;
	}
	.poll-inner > p {
		font-size: 8px;
		color: #9b93a7;
		margin-bottom: 18px;
	}
	.poll-answer {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 8px;
		padding: 9px 10px;
		margin-top: 7px;
		border: 1px solid #e1dce9;
		border-radius: 4px;
		overflow: hidden;
	}
	.poll-answer span {
		position: relative;
		z-index: 1;
	}
	.poll-answer i {
		position: absolute;
		inset: 0 auto 0 0;
		background: #e0d9ed;
	}
	.poll-answer:first-of-type i {
		background: #c9badf;
	}
	.poll-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 6px;
		margin-top: 17px;
		color: #89818f;
	}
	.poll-bottom > span:first-child {
		letter-spacing: 0.06em;
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.poll-bottom i {
		width: 4px;
		height: 4px;
		background: #8b6cae;
		border-radius: 50%;
	}
	.vote-toast {
		position: absolute;
		right: 22px;
		bottom: 34px;
		font-size: 9px;
		padding: 13px 17px;
		border: 1px solid #ffffff20;
		border-radius: 9px;
		background: #211e2abf;
		backdrop-filter: blur(20px);
		display: flex;
		gap: 8px;
		align-items: center;
		transform: rotate(3deg);
		box-shadow: 0 5px 30px #0003;
	}
	.toast-check {
		border-radius: 50%;
		width: 20px;
		height: 20px;
		display: grid;
		place-items: center;
		background: #c5b4de20;
		color: #d0bbee;
	}
	.liceo {
		background: radial-gradient(ellipse at 50% 100%, #253439, #121919 70%);
	}
	.support-glow {
		position: absolute;
		top: -70%;
		left: 0;
		width: 100%;
		height: 130%;
		border: 1px solid #e1faff0d;
		border-radius: 50%;
		box-shadow: 0 40px 70px #bdcdd00a;
	}
	.support-window {
		display: flex;
		position: absolute;
		width: 88%;
		left: 9%;
		top: 73px;
		height: 258px;
		border-radius: 9px;
		background: #f4f6f5;
		color: #283b3a;
		transform: perspective(1000px) rotateY(-8deg) rotateZ(4deg);
		box-shadow: 0 28px 60px #0007;
		overflow: hidden;
	}
	.support-window aside {
		width: 42px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 14px 0;
		gap: 22px;
		background: #e8eeeb;
		color: #929f9a;
	}
	.support-mark {
		color: #436055;
		font-family: var(--font-heading);
		font-style: italic;
		font-size: 30px;
		line-height: 1;
	}
	.aside-avatar {
		font-size: 7px;
		background: #ccd6ce;
		color: #53665b;
		padding: 6px;
		border-radius: 50%;
		margin-top: auto;
	}
	.support-main {
		padding: 17px 19px;
		width: 100%;
	}
	.support-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #879990;
	}
	.support-top strong {
		font-size: 13px;
		letter-spacing: -0.04em;
		color: #394c42;
	}
	.support-top strong span {
		font-weight: 300;
	}
	.support-heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
	}
	.support-heading h4 {
		font-size: 13px;
	}
	.support-heading .preview-small {
		color: #83928b;
		font-size: 5px;
	}
	.new-ticket {
		display: flex;
		gap: 3px;
		align-items: center;
		font-size: 5px;
		border-radius: 4px;
		color: white;
		background: #4c695a;
		padding: 6px;
	}
	.ticket-stats {
		display: flex;
		gap: 9px;
		margin-top: 16px;
	}
	.ticket-stats > div {
		flex: 1;
		border: 1px solid #dbe2df;
		border-radius: 5px;
		padding: 9px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.ticket-stats span {
		font-size: 6px;
		color: #88978f;
	}
	.ticket-stats strong {
		font-size: 17px;
		font-weight: 500;
	}
	.ticket-list > div {
		display: flex;
		gap: 7px;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid #e6eae7;
		font-size: 6px;
	}
	.ticket-icon {
		color: #84958a;
	}
	.ticket-list small {
		display: block;
		color: #98a49c;
		font-size: 5px;
		margin-top: 3px;
	}
	.ticket-badge {
		margin-left: auto;
		color: #8d7c54;
		background: #eee8d9;
		border-radius: 3px;
		padding: 3px 6px;
	}
	.ticket-badge.resolved {
		background: #e1ebe3;
		color: #668b6c;
	}
	.attendance {
		background: radial-gradient(ellipse at 70% 80%, #333534, #151615 70%);
	}
	.attendance-brand {
		position: absolute;
		left: 7%;
		top: 63px;
	}
	.attendance-brand > div {
		font-family: var(--font-heading);
		font-size: 40px;
		line-height: 1.08;
		letter-spacing: -0.035em;
		margin-top: 28px;
	}
	.attendance-brand em {
		color: #a4aca3;
	}
	.attendance-brand > span {
		display: block;
		font-size: 8px;
		letter-spacing: 0.16em;
		margin-top: 22px;
		color: #848a83;
	}
	.phone {
		width: 179px;
		height: 345px;
		padding: 21px 13px;
		background: #efefeb;
		color: #344239;
		border: 6px solid #202420;
		border-radius: 31px;
		box-shadow:
			1px 0 0 1px #8d948a80,
			0 20px 55px #000a;
		transform: rotate(12deg);
		position: absolute;
		left: 66%;
		top: 40px;
	}
	.phone-camera {
		position: absolute;
		top: 8px;
		left: calc(50% - 21px);
		width: 42px;
		height: 10px;
		border-radius: 10px;
		background: #202420;
	}
	.phone-time {
		display: flex;
		justify-content: space-between;
		font-size: 6px;
	}
	.phone-greeting {
		font-size: 7px;
		margin-top: 27px;
		color: #99a096;
	}
	.phone-greeting strong {
		display: block;
		font-size: 17px;
		font-weight: 500;
		color: #3d4a3d;
		margin-top: 4px;
	}
	.clock-face {
		display: flex;
		flex-direction: column;
		gap: 7px;
		align-items: center;
		justify-content: center;
		width: 105px;
		height: 105px;
		margin: 19px auto 13px;
		border-radius: 50%;
		border: 1px solid #a9b8a255;
		background: radial-gradient(circle, #fff, #e5e9e1);
		box-shadow: 0 0 0 5px #e4e7df;
	}
	.clock-face > span {
		font-size: 28px;
		font-weight: 300;
		letter-spacing: -0.04em;
	}
	.clock-face small {
		font-size: 5px;
		letter-spacing: 0.12em;
	}
	.clock-button {
		background: #404f3c;
		color: #fff;
		display: flex;
		justify-content: center;
		gap: 8px;
		align-items: center;
		border-radius: 6px;
		padding: 8px;
		font-size: 7px;
	}
	.phone-activity {
		margin-top: 17px;
	}
	.phone-activity > span {
		font-size: 5px;
		letter-spacing: 0.1em;
		color: #959e92;
	}
	.phone-activity > div {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 7px;
		color: #83917a;
	}
	.phone-activity p {
		font-size: 6px;
		color: #576150;
	}
	.phone-activity small {
		display: block;
		color: #9da493;
		font-size: 5px;
		margin-top: 3px;
	}
	.phone-bar {
		position: absolute;
		bottom: 9px;
		width: 50px;
		height: 3px;
		left: calc(50% - 25px);
		background: #374333;
		border-radius: 4px;
	}
	.scan-badge {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 10px;
		background: #aeb3a810;
		border: 1px solid #ffffff16;
		backdrop-filter: blur(24px);
		border-radius: 10px;
		padding: 13px 19px;
		position: absolute;
		left: 54%;
		top: 216px;
		transform: rotate(-5deg);
	}
	.scan-badge > div {
		color: #a5ada0;
		line-height: 1.5;
	}
	.scan-badge strong {
		font-weight: 400;
		color: #ddd;
	}
	.illustration-label {
		position: absolute;
		bottom: 12px;
		left: 18px;
		font-size: 6px;
		letter-spacing: 0.16em;
		color: #ffffff40;
	}
	@media (max-width: 1100px) {
		.project-preview {
			height: 310px;
		}
		.poll-window {
			width: 78%;
			left: 8%;
			top: 76px;
		}
		.poll-inner {
			padding: 19px;
		}
		.pollify-brand {
			left: 24px;
		}
		.pollify-brand > span {
			display: none;
		}
		.support-window {
			width: 96%;
			left: 5%;
			top: 62px;
		}
		.attendance-brand > div {
			font-size: 34px;
		}
	}
	@media (max-width: 600px) {
		.project-preview {
			height: 300px;
		}
		.poll-window {
			width: 80%;
		}
		.poll-inner {
			padding: 17px;
		}
		h4 {
			font-size: 16px;
		}
		.poll-answer {
			font-size: 7px;
		}
		.vote-toast {
			right: 13px;
			bottom: 25px;
			font-size: 8px;
		}
		.support-main {
			padding-inline: 13px;
		}
		.support-heading h4 {
			font-size: 11px;
		}
		.attendance {
			height: 375px;
		}
		.attendance-brand {
			top: 32px;
			left: 8%;
		}
		.attendance-brand > div {
			font-size: 26px;
			margin-top: 17px;
			max-width: 170px;
		}
		.attendance-brand > span {
			font-size: 6px;
		}
		.phone {
			left: auto;
			right: 15px;
			top: 118px;
			width: 149px;
			height: 290px;
		}
		.phone-greeting {
			margin-top: 15px;
		}
		.phone-greeting strong {
			font-size: 14px;
		}
		.clock-face {
			width: 85px;
			height: 85px;
			margin-top: 14px;
		}
		.clock-face > span {
			font-size: 23px;
		}
		.phone-activity {
			margin-top: 10px;
		}
		.scan-badge {
			left: 22px;
			top: 258px;
			padding: 11px;
			font-size: 8px;
		}
		.phone-activity > div {
			margin-top: 4px;
		}
	}
</style>
