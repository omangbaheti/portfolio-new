<script lang="ts">
	const types = [
		'VR Experience',
		'AR Application',
		'Game Dev',
		'UX Research',
		'Embedded Research',
		'Mixed Reality',
		'Consulting'
	];

	const rows = [
		{ label: 'EMAIL', value: 'omang@baheti.dev' },
		{ label: 'LOCATION', value: 'Amsterdam / Remote' },
		{ label: 'DEV SLOT', value: 'Q1 2025 — Open' },
		{ label: 'RESEARCH', value: 'Q1 2025 — Limited' },
		{ label: 'RESPONSE', value: '< 24 hours' }
	];

	const socials = [
		{ label: 'GITHUB', href: 'https://github.com' },
		{ label: 'LINKEDIN', href: 'https://www.linkedin.com' },
		{ label: 'SCHOLAR', href: 'https://scholar.google.com' }
	];

	let form = $state({ name: '', email: '', type: '', message: '' });
	let sent = $state(false);
	let focused = $state('');
</script>

<section id="contact" class="contact">
	<div class="container grid">
		<!-- Left -->
		<div class="left">
			<div class="head">
				<span class="eyebrow">START A FIGHT</span>
				<h2 class="display title">Start a<br />Project</h2>
			</div>

			<p class="intro">
				Open for XR development, embedded research, and hybrid engagements where both disciplines
				matter.
			</p>

			<div class="spec panel-dk flat-shadow">
				{#each rows as r (r.label)}
					<div class="spec-row">
						<span class="mono-label dim-label">{r.label}</span>
						<span class="mono-label val">{r.value}</span>
					</div>
				{/each}
			</div>

			<div class="socials">
				{#each socials as s (s.label)}
					<a href={s.href} class="social" target="_blank" rel="noreferrer">
						<span class="s-label mono-label">{s.label}</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Form -->
		<div class="form-col">
			{#if sent}
				<div class="sent panel-dk flat-shadow">
					<span class="mono-label sent-tag">TRANSMISSION RECEIVED</span>
					<h3 class="display sent-title">Fight<br />on!</h3>
				</div>
			{:else}
				<form onsubmit={sent = true} class="form">
					<div class="field-row">
						<div class="field">
							<span class="mono-label label">{'NAME'}</span>
							<input
								type="text"
								required
								placeholder="Your name"
								bind:value={form.name}
								class:focus={focused === 'name'}
								onfocus={() => (focused = 'name')}
								onblur={() => (focused = '')}
							/>
						</div>
						<div class="field">
							<span class="mono-label label">{'EMAIL'}</span>
							<input
								type="email"
								required
								placeholder="your@email.com"
								bind:value={form.email}
								class:focus={focused === 'email'}
								onfocus={() => (focused = 'email')}
								onblur={() => (focused = '')}
							/>
						</div>
					</div>

					<div>
						<span class="mono-label label">ENGAGEMENT TYPE</span>
						<div class="chips">
							{#each types as type (type)}
								<button
									type="button"
									class="chip"
									class:active={form.type === type}
									onclick={() => (form.type = type)}
								>
									{type}
								</button>
							{/each}
						</div>
					</div>

					<div>
						<span class="mono-label label">MESSAGE</span>
						<textarea
							rows={6}
							required
							placeholder="Platform, research goals, timeline..."
							bind:value={form.message}
							class:focus={focused === 'message'}
							onfocus={() => (focused = 'message')}
							onblur={() => (focused = '')}
						></textarea>
					</div>

					<button type="submit" class="submit display">Send Message →</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact {
		padding: 60px 0 80px;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		padding: 0 24px;
	}
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: 4fr 8fr;
			gap: 64px;
		}
	}

	.head {
		margin-bottom: 28px;
	}
	.title {
		font-size: clamp(2.4rem, 8vw, 4.6rem);
		color: var(--char);
		margin-top: 8px;
		line-height: 0.85;
	}
	.intro {
		font-size: 14px;
		font-weight: 300;
		max-width: 40ch;
		margin-bottom: 32px;
	}

	.spec {
		border: 2px solid var(--char);
	}
	.spec-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 13px 16px;
		border-bottom: 1px solid rgba(239, 227, 208, 0.2);
	}
	.spec-row:last-child {
		border-bottom: none;
	}
	.dim-label {
		color: var(--orange);
	}
	.val {
		color: var(--cream);
	}

	.socials {
		margin-top: 28px;
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
	}
	.social {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		border: 2px solid var(--char);
		padding: 12px 16px;
		box-shadow: var(--flat-shadow);
		transition: background 0.15s, color 0.15s;
	}
	.social:hover {
		background: var(--orange);
	}
	.social:hover .s-label {
		color: var(--cream);
	}
	.s-label {
		color: var(--char);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	.field-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}
	@media (min-width: 700px) {
		.field-row {
			grid-template-columns: 1fr 1fr;
		}
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.label {
		color: var(--orange);
	}

	input,
	textarea {
		background: transparent;
		border: none;
		border-bottom: 2px solid var(--char);
		padding: 12px 2px;
		font-size: 14px;
		color: var(--char);
		width: 100%;
		outline: none;
		font-family: var(--font-subs);
		transition: border-color 0.15s;
	}
	textarea {
		resize: none;
	}
	input::placeholder,
	textarea::placeholder {
		color: rgba(28, 27, 25, 0.4);
	}
	.focus {
		border-bottom-color: var(--orange);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 14px;
	}
	.chip {
		font-family: var(--font-subs);
		font-weight: 400;
		font-size: 12px;
		letter-spacing: 0.08em;
		background: var(--beige);
		color: var(--char);
		border: 2px solid var(--char);
		padding: 8px 14px;
		text-transform: uppercase;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.chip:hover {
		background: var(--char);
		color: var(--cream);
	}
	.chip.active {
		background: var(--orange);
		border-color: var(--orange);
		color: var(--cream);
	}

	.submit {
		background: var(--orange);
		color: var(--cream);
		font-size: 15px;
		letter-spacing: 0.08em;
		width: 100%;
		padding: 16px;
		border: 2px solid var(--char);
		box-shadow: var(--flat-shadow);
		cursor: pointer;
		text-transform: uppercase;
	}
	.submit:hover {
		background: var(--char);
		border-color: var(--orange);
	}

	.sent {
		border: 2px solid var(--char);
		text-align: center;
		padding: 60px 24px;
	}
	.sent-tag {
		color: var(--orange);
	}
	.sent-title {
		color: var(--cream);
		font-size: clamp(2.4rem, 6vw, 4rem);
		margin: 16px 0;
	}
</style>